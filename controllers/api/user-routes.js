const router = require("express").Router()
const { User, Post, Comment } = require("../../models")
const session = require("express-session")
const SequelizeStore = require("connect-session-sequelize")(session.Store)

const withAuth = require("../../utils/auth")

//Routes

router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((userData) => res.json(userData))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post_text", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "User Not Found" })
        return
      }
      res.json(userData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((userData) => {
      req.session.save(() => {
        req.session.user_id = userData.id
        req.session.username = userData.username
        req.session.loggedIn = true
        res.json({ user: userData, message: "Registration Successfull" })
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((userData) => {
    if (!userData) {
      res.status(400).json({ message: "Email address not found!" })
      return
    }
    const validPassword = userData.checkPassword(req.body.password)
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" })
      return
    }
    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.username = userData.username
      req.session.loggedIn = true

      res.json({ user: userData, message: "Login Successfull!" })
    })
    console.log("SESSION IS SAVED?", req.session)
  })
})

router.put("/:id", withAuth, (req, res) => {
  User.update(req.body, {
    Hooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((userData) => {
      if (!userData[0]) {
        res.status(404).json({ message: "No user found with this id" })
        return
      }
      res.json(userData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.delete("/:id", withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "No user found with this id" })
        return
      }
      res.json(userData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.post("/logout", withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

module.exports = router

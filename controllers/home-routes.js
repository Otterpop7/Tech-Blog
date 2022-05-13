const router = require("express").Router()
const { User, Post, Comment } = require("../models")
const withAuth = require("../utils/auth")

router.get("/post/:id", async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {
    include: [User, { model: Comment, include: [User] }],
  })
  let post = await postData.get({ plain: true })
  console.log(post)
  res.render("singlepost", {
    post,
    loggedIn: req.session.loggedIn,
  })
})

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      order: [["date_created", "ASC"]],
    })
    const posts = postData.map((post) => post.get({ plain: true }))
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get("/login", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/")
    return
  }

  const postData = await Post.findAll({
    order: [["date_created", "ASC"]],
  })
  const posts = postData.map((post) => post.get({ plain: true }))

  res.render("login", {
    posts: posts,
  })
})

router.get("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect("/")
    })
  }
})

router.get("/signup", (req, res) => {
  res.render("signup")
})

module.exports = router

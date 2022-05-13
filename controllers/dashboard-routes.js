const router = require("express").Router()
const { User, Post, Comment } = require("../models")
const session = require("express-session")
const SequelizeStore = require("connect-session-sequelize")(session.Store)

const withAuth = require("../utils/auth")

//Routes

router.get("/", withAuth, async (req, res) => {
  const userId = req.session.user_id

  const postData = await Post.findAll({
    where: {
      user_id: userId,
    },
  })

  const posts = postData.map((post) => post.get({ plain: true }))

  res.render("dashboard", {
    posts,
  })
})

router.get("/edit/:id", withAuth, async (req, res) => {
  const postData = await Post.findByPk(req.params.id)

  const post = postData.get({ plain: true })

  res.render("editPost", {
    post: post,
  })
})

module.exports = router

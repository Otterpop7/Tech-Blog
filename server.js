const express = require("express")
const session = require("express-session")
const routes = require("./controllers")
const myHelpers = require("./utils/helpers")

const sequelize = require("./config/connection")
//Loads the handlebars module
const handlebars = require("express-handlebars")
const SequelizeStore = require("connect-session-sequelize")(session.Store)

const app = express()
const PORT = process.env.PORT || 3001

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
}

app.use(session(sess))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

//Sets our app to use the handlebars engine
app.set("view engine", "handlebars")

var hbs = handlebars.create({})

hbs.handlebars.registerHelper("format_date", function (date) {
  return myHelpers.format_date(date)
})

hbs.handlebars.registerHelper("format_plural", function (word, amount) {
  return myHelpers.format_plural(word, amount)
})

//Sets handlebars configurations (we will go through them later on)
app.engine(
  "handlebars",
  handlebars({
    layoutsDir: __dirname + "/views/layouts",
  })
)

app.use(routes)

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
})

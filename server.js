// const express = require("express")
// const session = require("express-session")
// const routes = require("./controllers")
// const myHelpers = require("./utils/helpers")

// const app = express()
// const PORT = process.env.PORT || 3001

// const sequelize = require("./config/connection")
// //Loads the handlebars module
// const handlebars = require("express-handlebars")
// const SequelizeStore = require("connect-session-sequelize")(session.Store)

// const sess = {
//   secret: "Super secret secret",
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// }

// app.use(session(sess))

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(express.static("public"))

// //Sets our app to use the handlebars engine
// app.set("view engine", "handlebars")

// var hbs = handlebars.create({})

// hbs.handlebars.registerHelper("format_date", function (date) {
//   return myHelpers.format_date(date)
// })

// hbs.handlebars.registerHelper("format_plural", function (word, amount) {
//   return myHelpers.format_plural(word, amount)
// })

// //Sets handlebars configurations (we will go through them later on)
// app.engine(
//   "handlebars",
//   handlebars({
//     layoutsDir: __dirname + "/views/layouts",
//   })
// )

// app.use(routes)

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
// })

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
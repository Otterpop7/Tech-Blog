const { User } = require("../models")

const userData = [
  {
    username: "Bobby Bojangles",
    email: "Bojangles@gmail.com",
    password: "password",
  },
  {
    username: "Mr. Clean",
    email: "Mr.Clean@gmail.com",
    password: "CL3@N",
  },
  {
    username: "Braveheart Guy",
    email: "guyfrombraveheart@gmail.com",
    password: "I_Love_Brave<3",
  },
  {
    username: "Anime waifu",
    email: "AnimeQueen@gmail.com",
    password: "IMAweeb!^.^",
  },
  {
    username: "Mr.Moose",
    email: "Moose@gmail.com",
    password: "Antlers123!",
  },
  {
    username: "Beastboy",
    email: "Beastboy@hotmail.com",
    password: "T33Ntitan!",
  },
]

const seedUser = () => User.bulkCreate(userData)

module.exports = seedUser

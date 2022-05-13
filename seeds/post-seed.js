const { Post } = require("../models")

const postData = [
  {
    title: "What if dogs could talk?",
    post_text:
      "What if when Elon Musks brainchip comes out he can insert into animals so that we can tell what they're thinking?",
    user_id: 1,
  },
  {
    title: "What if we had themesongs?",
    post_text:
      "Sometimes I wish that we had themesongs playing that we could all tune into as we people watch.",
    user_id: 2,
  },
  {
    title: "Malcom in the middle is a great show!",
    post_text:
      "I don't care what anyone else says malcom in the middle is a great show and you can't change my mind.",
    user_id: 3,
  },
  {
    title: "Investment opertunity!",
    post_text:
      "Guys I have a great website that you should all invest in! Please contact me!",
    user_id: 4,
  },
  {
    title: "Looking for a friend to hangout with tonight!",
    post_text:
      "Looking for a friend to hangout with must be over 6' tall and can pay for me. Let's get dinner?",
    user_id: 5,
  },
  {
    title: "Service Project anyone welcome to help.",
    post_text:
      "Looking for people to help me with my service project. We are painting the cities fire hydrants so that they're visible for the public!",
    user_id: 6,
  },
]

const seedPost = () => Post.bulkCreate(postData)

module.exports = seedPost

const { Comment } = require("../models")

const commentData = [
  {
    comment_text: "Dogs can talk you just don't know what 'bark' means.",
    post_id: 1,
    user_id: 4,
  },
  {
    comment_text:
      "Dogs communicate differently than humans I bet they have their own language.",
    post_id: 1,
    user_id: 3,
  },
  {
    comment_text:
      "That would be cool! What themesong would you pick for yourself?",
    post_id: 2,
    user_id: 1,
  },
  {
    comment_text: "I'd pick any banjo song that would be great!",
    post_id: 2,
    user_id: 2,
  },
  {
    comment_text: "Could get old though :/",
    post_id: 2,
    user_id: 5,
  },
  {
    comment_text: "Malcom in the Middle Sucks!! XD",
    post_id: 3,
    user_id: 1,
  },
  {
    comment_text:
      "Bro malcom in the middle is great! I agree with OP It's a classic.",
    post_id: 3,
    user_id: 4,
  },
  {
    comment_text: "OK, this guy is a scammer don't listen to what he says.",
    post_id: 4,
    user_id: 5,
  },
  {
    comment_text: "WHAT?!",
    post_id: 4,
    user_id: 3,
  },
  {
    comment_text:
      "You're not looking for a friend, you're looking for a boyfriend XD",
    post_id: 5,
    user_id: 3,
  },
  {
    comment_text: "Hey I'm 5'10. Is that good enough? I'm really funny.",
    post_id: 5,
    user_id: 3,
  },
  {
    comment_text:
      "Sounds great! I'll be there send me the address and time of the meetup for the project!",
    post_id: 6,
    user_id: 3,
  },
]

const seedComment = () => Comment.bulkCreate(commentData)

module.exports = seedComment

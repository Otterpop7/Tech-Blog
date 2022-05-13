const seedUser = require("./user-seed.js")
const seedPost = require("./post-seed.js")
const seedComment = require("./comment-seeds.js")

const sequelize = require("../config/connection")

const seedAll = async () => {
  await sequelize.sync({ force: true })

  console.log("\n----- DATABASE SYNCED -----\n")
  await seedUser().catch((err) => {
    console.error(err)
  })
  console.log("\n----- USER SEEDED -----\n")

  await seedPost().catch((err) => {
    console.error(err)
  })
  console.log("\n----- POST SEEDED -----\n")

  await seedComment().catch((err) => {
    console.error(err)
  })
  console.log("\n----- COMMENT SEEDED -----\n")

  process.exit(0)
}

seedAll()

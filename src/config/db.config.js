const mongoose = require("mongoose");
const { ATLAS_URL } = require("./server.config");
async function connectToDB() {
  try {
    await mongoose.connect(ATLAS_URL);
  } catch (err) {
    console.log("unable to connect to Db");
    console.log(err);
  }
}

module.exports = connectToDB;

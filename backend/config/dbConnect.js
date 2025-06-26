const mongoose = require("mongoose");
require("dotenv").config();

async function Connect() {
  try {
    let res = await mongoose.connect(process.env.MONGO_URL);
    if (res) {
      console.log("Database Connected SuccesFully");
    }
  } catch (error) {
     console.log(error);
  }
}

module.exports = Connect;

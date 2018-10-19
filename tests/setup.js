const mongoose = require("mongoose");
require("../models/user.model");
require("dotenv").config();
beforeEach(async () => {
  async function clearDB() {
    await Promise.all(
      Object.keys(mongoose.connection.collections).map(async key => {
        return await mongoose.connection.collections[key].deleteMany({});
      })
    );
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      `mongodb://${process.env.USER}:${
        process.env.PASS
      }@ds137263.mlab.com:37263/uptonm-ci-testing`,
      { useNewUrlParser: true }
    );
  }
  await clearDB();
});

afterAll(async () => {
  await mongoose.disconnect();
});

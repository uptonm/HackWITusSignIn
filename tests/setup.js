const mongoose = require('mongoose');
require('../models/user.model')
require('dotenv').config();
beforeEach(async () => {
  async function clearDB() {
    await Promise.all(
      Object.keys(mongoose.connection.collections).map(async (key) => {
        return await mongoose.connection.collections[key].deleteMany({});
      })
    );
  }
 
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      `mongodb://${process.env.USER}:${process.env.PASS}@ds151402.mlab.com:51402/upton-auth`,
      { useNewUrlParser: true }
    );
  }
  await clearDB();
});
 
afterEach(async () => {
  await mongoose.connection.close();
});


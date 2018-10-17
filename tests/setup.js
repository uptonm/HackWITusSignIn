const mongoose = require("mongoose");
require("dotenv").config();

beforeEach(done => {
  clearDB = () => {
    for (let i in mongoose.connection.collections) {
      mongoose.connection.collections[i].deleteMany({});
    }
    return done();
  };

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      `mongodb://${process.env.USER}:${
        process.env.PASS
      }@ds151402.mlab.com:51402/upton-auth`,
      { useNewUrlParser: true },
      function(err) {
        if (err) {
          throw err;
        }
        return clearDB();
      }
    );
  } else {
    return clearDB();
  }
});

afterEach(done => {
  mongoose.disconnect();
  return done();
});

afterAll(done => {
  return done();
});

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

mongoose.connect(
  `mongodb://${process.env.USER}:${
    process.env.PASS
  }@ds151402.mlab.com:51402/upton-auth`,
  { useNewUrlParser: true }
);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});

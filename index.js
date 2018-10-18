const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

mongoose.connect(
  `mongodb://${process.env.USER}:${
    process.env.PASS
  }@ds151402.mlab.com:51402/upton-auth`,
  { useNewUrlParser: true }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routes/user.routes")(app);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});

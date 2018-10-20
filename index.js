const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const bodyParser = require("body-parser");
require("dotenv").config();

require('./models/user.model')
require('./services/passport'); // Passport handles oAuth

mongoose.connect(
  `mongodb://${process.env.USER}:${
    process.env.PASS
  }@ds151402.mlab.com:51402/upton-auth`,
  { useNewUrlParser: true }
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth.routes')(app);
require("./routes/user.routes")(app);

if(process.env.NODE_ENV === 'production') {
  // Express will serve prod assets i.e. main.js/main.class
  app.use(express.static('client/build')); // If a route is unrecognized, look at react build

  // Express will serve up index.html if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => { // Serve the client the document in that case
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

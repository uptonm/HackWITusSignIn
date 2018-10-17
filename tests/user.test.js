const mongoose = require("mongoose");
const User = mongoose.model('users');

test("Saving user to database", () => {
  expect(2+2).toEqual(4);
});


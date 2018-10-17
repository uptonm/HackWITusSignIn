const mongoose = require("mongoose");
const User = mongoose.model('users');

describe("User Testing", () => {
  test("Saving user to database", async () => {
    await new User({
      first: "Joe",
      last: "Smith",
      email: "smithj@giggle.io"
    }).save();
    const exists = await User.findOne({ first: "Joe" });
    expect(exists.first).toEqual("Joe");
  });
});

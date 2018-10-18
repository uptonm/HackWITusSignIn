const mongoose = require("mongoose");
const User = require("../models/user.model");

exports.get = (req, res) => {
  res.send("Getting All");
};

exports.getOne = (req, res) => {
  res.send("Getting one");
};

exports.post = (req, res) => {
  res.send("Posting one");
};

exports.put = (req, res) => {
  res.send("Putting one");
};

exports.delete = (req, res) => {
  res.send("Deleteing One");
};

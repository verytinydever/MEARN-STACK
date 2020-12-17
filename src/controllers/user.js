const User = require("../models/user");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({ message: "Error occured" });
    }
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: "shashi",
    });
    _user.save((error, data) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: "Error occured" });
      }
      if (data) {
        return res.status(201).json({ user: "User created!!" });
      }
    });
  });
};

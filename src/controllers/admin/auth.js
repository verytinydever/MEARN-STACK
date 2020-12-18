const User = require('../../models/user')
const jwt = require('jsonwebtoken')
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({ message: 'Error occured' })
    }
    if (user) {
      return res.status(400).json({
        message: 'Admin already exists',
      })
    }
    const {
      firstName,
      lastName,
      email,
      password,
      username,
      phoneNumber,
    } = req.body
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username,
      phoneNumber,
      role:'admin'
    })
    _user.save((error, data) => {
      if (error) {
        console.log(error)
        return res.status(400).json({ message: 'Error occured' })
      }
      if (data) {
        return res.status(201).json({ user: 'Admin created!!' })
      }
    })
  })
}
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({ error })
    }
    if (user) {
      if (user.authenticate(req.body.password) && user.role==='admin') {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '1h',
        })
        const {
          _id,
          firstName,
          lastName,
          email,
          role,
          phoneNumber,
          fullName,
        } = user
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            phoneNumber,
            role,
            fullName,
          },
        })
      } else {
        return res.status(400).json({ message: 'Invalid password' })
      }
    } else {
      return res.status(400).json({ message: 'Error Occured' })
    }
  })
}

exports.requireSignin = (req, res, next) => {
  const token=req.headers.authorization.split(" ")[1];
  const user=jwt.verify(token,process.env.JWT_SECRET);
  req.user=user;
  next();

}

const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../../models/User')

exports.checkUser = function  (req, res, next) {
  let token = req.headers.authorization.replace('Bearer ', '')
  // console.log("this is middleware")
  // console.log(token)

  // check token
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedJwt) => {
      try {
        if (err) {
          console.log(err.message);
          res.status(400).send('Token is not verified');
        } else {
          const _id = decodedJwt.id;
          const user = await User.findById(_id, {password: 0});
            if (!user) {
              res.status(404).send('User not found!');
            } else {
              req.user = user;
              next();
            }
          }
        } catch (error) {
        console.log(error)
        res.status(500).send(error)
        }
      }
    )
  } else {
    res.status(400).send('No token found!');
  }
}

exports.getUserDetail = function (req, res, next) {
  let token = req.headers.authorization.replace('Bearer ', '');
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          console.log(err.message);
          res.status(400).send('Token is not verified');
        } else {
          req.userId = user.id;
          next();
        }
      });
    } else {
      res.status(400).send('No token found!');
    }
}

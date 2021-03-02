const mongoose = require('mongoose');
const User = require('../models/user.js');
/**
 * POST signup user
 */
exports.signup = (req, res) => {
  const { mail, password } = req.body;
  if (mail && password) {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      mail: mail,
      password: password
    });
    user
      .save()
      .then((user) => {
        console.log(user);
        res.status(200).json({ message: 'User registered', user });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  } else {
    res.status(400).json({ error: 'Mail or password is missing' });
  }
};

/**
 * POST login user
 */
exports.login = async (req, res) => {
  const { mail, password } = req.body;
  if (mail && password) {
    try {
      const dbUser = await User.findOne({ mail: mail }).exec();
      if (!dbUser) {
        res.status(400).json({ error: "This mail doesn't exists" });
      } else if (dbUser.password === password) {
        res
          .status(200)
          .json({ message: 'Successfully logged in !', key: 'key' });
      } else {
        res.status(403).json({ error: 'Wrong password' });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    res.status(400).json({ error: 'Mail or password is missing' });
  }
};

exports.update = async (req, res) => {
  const userId = req.params.id;
  const { password } = req.body;
  if (userId && password) {
    try {
      let output = await User.findOneAndUpdate(
        { _id: userId },
        { password: password },
        { new: true, upsert: true, rawResult: true }
      );
      if (output.lastErrorObject.updatedExisting) {
        res.status(200).json({ message: 'User updated', user: output });
      } else {
        res.status(400).json({ error: 'Nothing got changed' });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    res.status(400).json({ error: 'Id or user is missing' });
  }
};

exports.delete = async (req, res) => {
  const userId = req.params.id;
  if (userId) {
    try {
      let output = await User.deleteOne({ _id: userId });
      if (output.ok) {
        res.status(200).json({ message: 'User deleted' });
      } else {
        res.status(400).json({ error: 'This id does not exists' });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    res.status(400).json({ error: 'Id is missing' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    let output = await User.find();
    res.status(200).json({ users: output });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

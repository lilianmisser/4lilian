const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  mail: { type: String, match: /[\w\d]{3,20}/, unique: true },
  password: String
});

module.exports = mongoose.model('User', userSchema);

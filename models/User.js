const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }],
  following : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }]
},
{
  timestamps:true
});

module.exports = User = mongoose.model("users", UserSchema);

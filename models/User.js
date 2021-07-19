import mongoose from "mongoose"

const { Schema, model }= mongoose

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
  }
},
{
  timestamps:true
});

export default model("users", UserSchema);

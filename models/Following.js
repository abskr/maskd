import mongoose from "mongoose"

const { Schema, model }= mongoose

export const followingSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  uFollowing: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
  ],
});

export default model("following", followingSchema)
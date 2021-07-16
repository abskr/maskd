import mongoose from 'mongoose'

const {Schema, model} = mongoose

// Create Schema
const PostSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    votes:  [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users'
        }
      ]
  },
  {
    timestamps: true,
  }
);

export default model('posts', PostSchema);
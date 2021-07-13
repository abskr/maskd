const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: {
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
          ref: 'users',
          unique: true
        }
      ]
  },
  {
    timestamps: true,
  }
);

module.exports = Post = mongoose.model('posts', PostSchema);
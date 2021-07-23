import mongoose from 'mongoose';
import {PostSchema} from './Post.js'

const { Schema, model } = mongoose;

const ReplySchema = new Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  reply: [
    PostSchema,
  ],
});

export default model('reply', ReplySchema);

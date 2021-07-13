const mongoose = require('mongoose')
const express = require("express")
const router = express.Router()
// const jwt = require("jsonwebtoken")
// const passport = require("passport")

// import middlewares
const { checkUser } = require("../middlewares/authMiddleware")

// Load models
const User = require("../../models/User");
const Post = require("../../models/post");
const { findByIdAndDelete } = require("../../models/User");

// Load input validation
// NOT DONE

// @route GET api/posts
// @desc fetch all Post
// @access Private
router.get("/", checkUser, async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).send(posts)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

// @route post api/posts
// @desc fetch all Post
// @access Private
router.post("/", checkUser, async (req, res) => {
  // console.log(req.userId)
  // Check if user exists
  req.body.userId = req.user._id
  try {
    const post = new Post({
      text: req.body.text,
      userId: req.body.userId
    })
    const newPost = await post.save()
    // console.log(newPost)
    res.status(200).send(newPost)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

// @route post api/posts/:id
// @desc fetch a post by id
// @access Private
router.get('/:id', checkUser, async (req, res) => {
  try{
    const postId = req.params.id
    const post = await Post.findById( postId )
    if (!post) res.sendStatus(404).send('Post not found!')
    else res.status(200).send(post)
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
})

// router.put('/:id', checkUser, async (req, res) => {
//   const userId = req.user._id
//   const postId = req.params._id
//   try {
//     const updatePost = {text: req.body.text}
//     const post = await Post.findOneAndUpdate({_id: postId, userId: userId}, updatePost, {new: true})
//     if (!post) res.send(404).send('post not found!')
//     // const {_id} = post
//     res.status(202).send(post)
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// })

// @route post api/posts/:id
// @desc fetch a post by id
// @access Private
router.delete('/:id', checkUser, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findOne( {_id: postId, userId: req.user._id});
    if (!post) {
      return res.status(404).send('Post not found!')
    }
    if (!req.user._id.equals(post.userId)) {
      return res.status(403).send('Unauthorized!');
    } else {
      await Post.findOneAndDelete({ _id: postId, userId: req.user._id });
      return res.status(204).send();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post('/:id/upvote', checkUser, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send('Post not found!');
    }
    // const userId = req.user._id
    const {votes} = post
    const userId = mongoose.Types.ObjectId(req.user._id)
    // console.log(votes.includes(userId))
    const userLiked = votes.includes(userId);
    if (userLiked) {
      await Post.findByIdAndUpdate(postId, {$pull: {votes: {$in: [userId]}}}, {new: true})
      return res.status(202).send('upvote removed!')
    } else {
      await Post.findByIdAndUpdate(postId, {$push: {votes: userId}}, {new: true});
      return res.status(202).send('upvote success!');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router
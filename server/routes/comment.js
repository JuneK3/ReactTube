const express = require('express');
const path = require('path');
const { Comment } = require('../models/comment');
const router = express.Router();

router.post('/saveComment', async (req, res) => {
  try {
    const comment = new Comment(req.body);
    console.log(comment);
    await comment.save();
    Comment.findOne({ _id: comment._id })
      .populate('writer')
      .exec((err, content) => {
        if (err) return res.json({ success: false, err });
        return res.json({ success: true, content });
      });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
});

router.post('/getComments', async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.body.videoId }).populate(
      'writer'
    );
    console.log(comments);
    return res.json({ success: true, comments });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
});

module.exports = router;

const express = require('express');
const path = require('path');
const { Like } = require('../models/like');
const { Dislike } = require('../models/dislike');

const router = express.Router();

router.post('/getLikes', async (req, res) => {
  try {
    let condition = {};
    if (req.body.videoId) {
      condition = { videoId: req.body.videoId };
    } else {
      condition = { commentId: req.body.commentId };
    }
    const likes = await Like.find(condition);
    return res.json({ success: true, likes });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
});

router.post('/getDislikes', async (req, res) => {
  try {
    let condition = {};
    if (req.body.videoId) {
      condition = { videoId: req.body.videoId };
    } else {
      condition = { commentId: req.body.commentId };
    }
    const dislikes = await Dislike.find(condition);
    return res.json({ success: true, dislikes });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
});

router.post('/upLike', async (req, res) => {
  try {
    let condition = {};
    if (req.body.videoId) {
      condition = { videoId: req.body.videoId };
    } else {
      condition = { commentId: req.body.commentId };
    }
    const like = new Like(req.body);
    await like.save();
    await Dislike.findOneAndDelete(condition);
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
});

router.post('/unLike', async (req, res) => {
  try {
    let condition = {};
    if (req.body.videoId) {
      condition = { videoId: req.body.videoId };
    } else {
      condition = { commentId: req.body.commentId };
    }
    await Like.findOneAndDelete(condition);
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
});

router.post('/upDislike', async (req, res) => {
  try {
    let condition = {};
    if (req.body.videoId) {
      condition = { videoId: req.body.videoId };
    } else {
      condition = { commentId: req.body.commentId };
    }
    const dislike = new Dislike(req.body);
    await dislike.save();
    await Like.findOneAndDelete(condition);
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
});

router.post('/unDislike', async (req, res) => {
  try {
    let condition = {};
    if (req.body.videoId) {
      condition = { videoId: req.body.videoId };
    } else {
      condition = { commentId: req.body.commentId };
    }
    await Dislike.findOneAndDelete(condition);
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
});

module.exports = router;

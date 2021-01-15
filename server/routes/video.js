const express = require('express');
const path = require('path');
const { User } = require('../models/user');
const { Video } = require('../models/video');
const { auth } = require('../middleware/auth');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.mp4') {
      return cb(res.status(400).end('only mp4 is allowed'), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage }).single('file');

router.post('/uploadFile', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: req.file.path,
      filename: req.file.filename,
    });
  });
});

router.post('/uploadVideo', async (req, res) => {
  try {
    const video = new Video(req.body);
    await video.save();
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
});

router.post('/thumbnail', (req, res) => {
  let filePath = '';
  let fileDuration = '';

  ffmpeg.ffprobe(req.body.url, (err, metadata) => {
    // console.log('metadata', metadata);
    // console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  ffmpeg(req.body.url)
    .on('filenames', (filenames) => {
      // console.log('Will generate', filenames.join(', '));
      // console.log(filenames);
      filePath = 'uploads/thumbnails/' + filenames[0];
    })
    .on('end', () => {
      console.log('Screenshots taken');
      return res.json({
        success: true,
        url: filePath,
        duration: fileDuration,
      });
    })
    .screenshots({
      count: 3,
      folder: 'uploads/thumbnails',
      size: '320x240',
      filename: 'thumbnail-%b.png',
    });
});

module.exports = router;

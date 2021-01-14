const { json } = require('express');
const express = require('express');
const path = require('path');
const { Subscriber } = require('../models/subscriber');
const router = express.Router();

router.post('/subscribeNumber', async (req, res) => {
  try {
    const subscribers = await Subscriber.find({ userTo: req.body.userTo });
    console.log(subscribers);
    return res.json({ success: true, subscribeNumber: subscribers.length });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
});

router.post('/subscribed', async (req, res) => {
  const { userTo, userFrom } = req.body;
  try {
    const subscribed = await Subscriber.find({
      userTo,
      userFrom,
    });
    let result = false;
    if (subscribed.length !== 0) {
      result = true;
    }
    return res.json({ success: true, subscribed: result });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
});

router.post('/subscribe', async (req, res) => {
  try {
    const doc = new Subscriber(req.body);
    await doc.save();
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
});

router.post('/unsubscribe', async (req, res) => {
  const { userTo, userFrom } = req.body;
  try {
    const doc = await Subscriber.findOneAndDelete({
      userTo,
      userFrom,
    });
    return res.json({ success: true, doc });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
});

module.exports = router;

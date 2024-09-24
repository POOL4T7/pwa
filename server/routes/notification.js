const {
  subscribe,
  unsubscribe,
  sendPushNotification,
} = require('../controller/pushNotifiction');
const { sendNotification } = require('../services/PushNotifiction');

const router = require('express').Router();

router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);
router.post('/send-notification', sendPushNotification);

router.post('/send-fcm-notifiction', async (req, res) => {
  try {
    const { deviceToken, title, body } = req.body;
    await sendNotification(deviceToken, title, body);
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
      success: false,
    });
  }
});

module.exports = router;

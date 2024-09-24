const webPush = require('web-push');

// const vapidKeys = webPush.generateVAPIDKeys();

webPush.setVapidDetails(
  'mailto:abhinvg90834@gmail.com',
  process.env.WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
);

let subscription = null;

exports.subscribe = async (req, res) => {
  try {
    console.log('req.body', req.body);
    subscription = req.body;
    // In production, save subscription to your database
    return res.status(200).json({ success: true, message: 'sub added' });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, error: e, message: 'server error' });
  }
};

exports.unsubscribe = async (req, res, next) => {
  try {
    subscription = null;
    // In production, save subscription to your database
    return res.status(200).json({ success: true, message: 'sub removed' });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, error: e, message: 'server error' });
  }
};

exports.sendPushNotification = async (req, res) => {
  const { message } = req.body;

  if (!subscription) {
    return res
      .status(400)
      .json({ success: false, error: 'No subscription available' });
  }

  try {
    await webPush.sendNotification(
      subscription,
      JSON.stringify({
        title: 'Test Notification',
        body: message,
        icon: '/icon.png',
      })
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending push notification:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to send notification' });
  }
};

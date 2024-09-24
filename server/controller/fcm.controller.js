const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(require('../firebase.json')),
});

exports.sendNotifiction = async (req, res) => {
  try {
    const payload = {
      notification: {
        title: 'New Message',
        body: 'You have a new message!',
        icon: '/next.svg',
      },
    };

    const tokens = ['web_fcm_token', 'android_fcm_token', 'ios_fcm_token']; // Add web and mobile tokens here

    admin
      .messaging()
      .sendMulticast({ tokens, data })
    .then(response => {
      // Response is an object of the form { responses: [] }
      const successes = response.responses.filter(r => r.success === true)
        .length;
      const failures = response.responses.filter(r => r.success === false)
        .length;
      console.log(
        'Notifications sent:',
        `${successes} successful, ${failures} failed`
      );
    })
    .catch(error => {
      console.log('Error sending message:', error);
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: 'notification error',
    });
  }
};

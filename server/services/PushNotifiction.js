const { admin } = require('./firebaseInit');

exports.sendNotification = async (deviceToken, title, body) => {
  try {
    const message = {
      notification: {
        title,
        body,
      },
      token: deviceToken,
    };
    const res = await admin.messaging().send(message); // sendEach 
    return res;
  } catch (e) {
    console.log(e);
    throw new Error('notification error');
  }
};

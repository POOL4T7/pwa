const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');

// const serviceAccount = require(googleApplicationCredentials);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'your-database-url-here',
});

exports.messaging = admin.messaging();
exports.admin = admin;

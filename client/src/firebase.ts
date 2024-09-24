// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { MessagePayload } from 'firebase/messaging/sw';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const messaging = getMessaging(app);

// Request permission and get FCM token
export const requestFCMToken = async () => {
  let token = '';
  try {
    const permission = await Notification?.requestPermission();
    if (permission === 'granted') {
      token = await getToken(messaging, {
        vapidKey: process.env.FCM_PUBLIC_KEY,
      });
      console.log('FCM token received:', token);
    } else {
      console.log('Permission not granted for notifications.');
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
  return token;
};

// Listener for receiving messages when the app is in the foreground
export const onMessageListener = () => {
  // const messaging = getMessaging();
  // onMessage(messaging, (payload) => {
  //   console.log('Received foreground message:', payload);
  //   if (payload?.notification) {
  //     callback(payload);
  //   }
  // });
  return onMessage(messaging, (payload) => {
    console.log('Foreground push notification received:', payload);
    // Handle the received push notification while the app is in the foreground
    // You can display a notification or update the UI based on the payload
  });
};

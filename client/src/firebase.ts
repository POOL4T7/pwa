'use client';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from 'firebase/messaging';
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
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(app);
    } else console.log('Firebase not supported this browser');
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
})();

// Request permission and get FCM token
export const requestFCMToken = async () => {
  let token = '';
  try {
    const msg = await messaging;
    const permission = await Notification?.requestPermission();
    if (permission === 'granted') {
      token = await getToken(msg!, {
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
export const onMessageListener = () =>
  new Promise((resolve) => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      (async () => {
        const messagingResolve = await messaging;
        onMessage(messagingResolve!, (payload) => {
          console.log('On message: ', messaging, payload);
          resolve(payload);
        });
      })();
    }
  });

export const FCM = messaging;

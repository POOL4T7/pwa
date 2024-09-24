'use client';
import { useEffect, useState } from 'react';
import { onMessageListener, requestFCMToken } from '@/firebase';
import { getMessaging, onMessage } from 'firebase/messaging';
import { toast } from 'react-toastify';

interface NotificationPayload {
  title: string;
  body: string;
}

const isBrowserSupported = () => {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window
  );
};

const useFirebaseMessaging = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<NotificationPayload | null>(
    null
  );

  useEffect(() => {
    const registerServiceWorker = async () => {
      if (navigator && 'serviceWorker' in navigator) {
        try {
          const registration = await navigator?.serviceWorker.getRegistration(
            '/firebase-messaging-sw.js'
          );
          console.log('registration', registration);
          const token = await requestFCMToken();
          setFcmToken(token);
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      }
    };

    const listenForForegroundMessages = async () => {
      // const messaging = getMessaging();
      // onMessage(messaging, (payload) => {
      //   console.log('Foreground message received:', payload);
      //   setNotification({
      //     title: payload.notification?.title || 'No Title',
      //     body: payload.notification?.body || 'No Body',
      //   });
      // });
      if (typeof window !== 'undefined') {
        console.log('listenForForegroundMessages');

        const data = onMessageListener();
        console.log('listenForForegroundMessages', data);
        return data;
      }
    };

    const listenForBackgroundMessages = () => {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'BACKGROUND_NOTIFICATION') {
          const { title, body } = event.data.payload;
          console.log('event.data.payload', event.data.payload);
          toast.success(title, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
          // toast('🦄 Wow so easy!', {
          //   position: 'top-right',
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: 'colored',
          // });
          setNotification({ title, body });
        }
      });
    };

    if (isBrowserSupported()) {
      registerServiceWorker();
      listenForForegroundMessages();
      listenForBackgroundMessages();
    } else {
      console.log('hsgvdchjs');
    }
  }, []);

  return { fcmToken, notification };
};

export default useFirebaseMessaging;

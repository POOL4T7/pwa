'use client';
import { useEffect, useState } from 'react';
import { onMessageListener, requestFCMToken } from '@/firebase';

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
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
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

    if (isBrowserSupported()) {
      registerServiceWorker();
    } else {
      console.log('Your browser not supporting the FCM');
    }
  }, []);

  onMessageListener()
    .then((payload: any) => {
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
    })
    .catch((err) => console.log('failed: ', err));

  return { fcmToken, notification };
};

export default useFirebaseMessaging;

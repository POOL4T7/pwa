'use client';
import { useEffect, useState } from 'react';

// Utility function to convert the VAPID public key to the required format
const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return new Uint8Array(rawData.split('').map((char) => char.charCodeAt(0)));
};

const PushNotification = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      'PushManager' in window
    ) {
      setIsIOS(
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
          !(window as any).MSStream
      );

      setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });

      // Check if the user is already subscribed
      let sub = await registration.pushManager.getSubscription();
      if (!sub) {
        // Subscribe if not already subscribed
        sub = await subscribeToPush(registration);
      }
      setSubscription(sub);
    } catch (e) {
      console.error('Service worker registration failed:', e);
    }
  };

  const subscribeToPush = async (registration: ServiceWorkerRegistration) => {
    try {
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string
        ),
      });

      console.log('User is subscribed:', sub);
      return sub;
    } catch (e) {
      console.error('Failed to subscribe to push notifications:', e);
      return null;
    }
  };

  const checkNotificationPermission = async () => {
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        registerServiceWorker();
      }
    }
  };

  useEffect(() => {
    // Check if the user has granted notification permissions when they load the page or refresh
    if (Notification.permission === 'default') {
      checkNotificationPermission();
    } else if (Notification.permission === 'granted') {
      registerServiceWorker();
    }
  }, []);

  return null; // This component doesn't render anything visually
};

export default PushNotification;

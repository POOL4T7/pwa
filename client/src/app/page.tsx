// page.tsx
'use client';
import { onMessageListener } from '@/firebase';
import useFirebaseMessaging from '@/hooks/useFirebaseMessaging';
import { useEffect } from 'react';

const Page = () => {
  const { fcmToken, notification } = useFirebaseMessaging();
  // console.log('notification', notification);

  useEffect(() => {
    // Set up the onMessageListener to handle foreground messages
    const unsubscribe = onMessageListener();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>FCM Token:</h1>
      <p>{fcmToken || 'No token available'}</p>
      {notification && (
        <div>
          <h2>New Notification:</h2>
          <p>{notification.title}</p>
          <p>{notification.body}</p>
        </div>
      )}
    </div>
  );
};

export default Page;

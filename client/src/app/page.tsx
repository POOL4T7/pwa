'use client';
import useFirebaseMessaging from '@/hooks/useFirebaseMessaging';

const Page = () => {
  const { fcmToken, notification } = useFirebaseMessaging();

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

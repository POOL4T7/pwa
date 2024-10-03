'use client';

import { useSessionContext } from '@/context/sessionProvider';

const Page = () => {
  // const { fcmToken, notification } = useFirebaseMessaging();
  const { session, loading } = useSessionContext();
  console.log('{ session, loading } ', { session, loading });
  return (
    <div>
      <h1>Landing Page</h1>
    </div>
  );
};

export default Page;

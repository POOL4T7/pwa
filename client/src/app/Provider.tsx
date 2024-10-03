'use client';

import { SessionContext } from '@/context/sessionProvider';
import useFirebaseMessaging from '@/hooks/useFirebaseMessaging';
import { SessionProvider } from 'next-auth/react';

export function Provider({ children }: { children: React.ReactNode }) {
  const { fcmToken, notification } = useFirebaseMessaging();
  
  return (
    <SessionProvider>
      <SessionContext>{children}</SessionContext>
    </SessionProvider>
  );
}

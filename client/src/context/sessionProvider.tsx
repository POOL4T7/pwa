// src/context/SessionProvider.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
interface SessionContextType {
  session: any;
  loading: boolean;
  token: string;
  refetchSession: () => void;
}

const SessionContextT = createContext<SessionContextType | undefined>(
  undefined
);

export const SessionContext = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [cachedSession, setCachedSession] = useState(session);
  const [token, setToken] = useState<string>('');
  const loading = status === 'loading';

  useEffect(() => {
    if (session) {
      setCachedSession(session);
    }
  }, [session]);

  const refetchSession = () => {
    setCachedSession(null);
  };

  return (
    <SessionContextT.Provider
      value={{ session: cachedSession, loading, refetchSession, token }}
    >
      {children}
    </SessionContextT.Provider>
  );
};

export const useSessionContext = () => {
  const context = useContext<SessionContextType | undefined>(SessionContextT);
  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }
  return context;
};

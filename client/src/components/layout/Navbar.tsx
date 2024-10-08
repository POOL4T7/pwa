'use client';

import Image from 'next/image';
import Link from 'next/link';
import useScroll from '@/hooks/useScroll';
import { signOut } from 'next-auth/react';
import { useSessionContext } from '@/context/sessionProvider';

export default function NavBar() {
  const scrolled = useScroll(50);
  const session = useSessionContext();

  return (
    <>
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? 'border-b border-gray-200 bg-white/50 backdrop-blur-xl'
            : 'bg-white/0'
        } z-30 transition-all`}
      >
        <div className='mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full'>
          <Link href='/' className='flex items-center font-display text-2xl'>
            <Image
              src='/vercel.svg'
              alt='Exam'
              width='30'
              height='30'
              className='mr-2 rounded-sm'
            ></Image>
            <p>Exam Portal</p>
          </Link>
          <div>
            {session.session?.user._id ? (
              <button
                className='rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black'
                onClick={async (e) => {
                  e.preventDefault();
                  await signOut();
                  window.location.href = '/';
                }}
              >
                ({session.session.user?.name}) Signout
              </button>
            ) : (
              <Link
                className='rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black'
                href={'/login'}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

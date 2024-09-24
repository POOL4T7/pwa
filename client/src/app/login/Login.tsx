import { GoogleSignInButton } from '@/components/auth/AuthButton';
import LoginForm from '@/components/auth/LoginForm';

import Link from 'next/link';
import Image from 'next/image';

export default async function Login() {
  return (
    <section className='bg-white mt-20 lg:mt-0'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <Link
          href='/'
          className='flex items-center mb-6 text-2xl font-bold text-gray-900 kumbh-font '
        >
          <Image
            src='/vercel.svg'
            height={140}
            width={180}
            alt='logo-exam-portal'
            priority={true}
          />
        </Link>

        <div className='flex flex-col items-center mt-10 p-10 shadow-md'>
          <div className='flex justify-center w-full'>
            <div className='flex w-full'>
              <GoogleSignInButton />
            </div>
          </div>
          <h1 className='mt-10 mb-4 text-4xl font-bold'>Sign In</h1>

          <LoginForm />
        </div>
      </div>
    </section>
  );
}

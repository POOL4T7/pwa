'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';

import { useSessionContext } from '@/context/sessionProvider';
import * as Yup from 'yup';

const initValues = {
  email: '',
  password: '',
};

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('* Email is Required'),
  password: Yup.string().required('* Password is Required'),
});

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { session } = useSessionContext();

  useEffect(() => {
    if (session?.user) {
      router.push('/');
    }
  }, [session?.user, router]);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    const signInResponse = await signIn('credentials', {
      email: values.email,
      password: values.password,
      fcmToken: localStorage.getItem('fcmToken'),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      //Redirect to homepage (/timeline)
      router.push('/timeline');
    } else {
      console.log('Error: ', signInResponse);
      setError('Your Email or Password is wrong!');
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={`  grid grid-cols-2 gap-x-2`}>
            <div className={`col-span-2 my-2`}>
              <Field
                name={'email'}
                type={'email'}
                placeholder={'Enter your email'}
                className={`bg-gray-50  border-2 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 `}
              />
              {errors['email'] && touched['email'] ? (
                <div className='text-[#ff0000] font-semibold flex justify-start text-sm mt-0'>
                  {String(errors['email'])}
                </div>
              ) : null}
            </div>
            <div className={`col-span-2 my-2`}>
              <Field
                name={'password'}
                type={'password'}
                placeholder={'Enter your password'}
                className={`bg-gray-50  border-2 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 `}
              />
              {errors['password'] && touched['password'] ? (
                <div className='text-[#ff0000] font-semibold flex justify-start text-sm mt-0'>
                  {String(errors['password'])}
                </div>
              ) : null}
            </div>
            <div className='flex items-center justify-between my-2'>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <Field
                    id={'rememberMe'}
                    aria-describedby={'rememberMe'}
                    name={'rememberMe'}
                    type={'checkbox'}
                    className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 accent-[#ff0101]'
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label htmlFor={'rememberMe'} className='text-gray-500 '>
                    Remember me
                  </label>
                </div>
              </div>
            </div>

            <button
              type='submit'
              className='w-full col-span-2 flex justify-center items-center text-white bg-[#FF0101] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  '
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className='loader_btn ml-2'></span>
              ) : (
                <>Submit</>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

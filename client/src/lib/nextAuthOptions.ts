import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        return null;
      },
    }),
    CredentialsProvider({
      name: 'Sign Up',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_ID as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? 'secret',
  callbacks: {
    async signIn(params) {
      if (!params.user.email) {
        return false;
      }
      console.log('params', params);
      // try {
      //   const existingUser = await PrismaClient.user.findUnique({
      //     where: {
      //       email: params.user.email,
      //     },
      //   });
      //   if (existingUser) {
      //     return true;
      //   }
      //   await PrismaClient.user.create({
      //     data: {
      //       email: params.user.email,
      //       hashedPassword: '',
      //       uid: '',
      //       status: 'Pending',
      //       photoUrl: params.user.image,
      //       name: params.user.name ?? '',
      //       // provider: 'Google',
      //     },
      //   });
      //   return true;
      // } catch (e) {
      //   console.log(e);
      //   return false;
      // }
      return true;
    },
    async session({ session, token, user }) {
      // const dbUser = await PrismaClient.user.findUnique({
      //   where: {
      //     email: session.user.email as string,
      //   },
      // });
      // if (!dbUser) {
      //   return session;
      // }
      return {
        ...session,
        // user: {
        //   id: dbUser.id,
        //   email: dbUser.email,
        //   name: dbUser.name,
        //   image: dbUser.photoUrl,
        // },
      };
    },
  },
};

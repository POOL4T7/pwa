import NextAuth, { User, type DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

declare module 'next-auth' {
  interface User {
    _id: string;
    role: string;
    email: string;
    name: string;
  }

  interface Session {
    user: User & DefaultSession['user'];
  }
}

const handler = NextAuth({
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
        fcmToken: { label: 'fcmToken', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              fcmToken: credentials.fcmToken,
            }),
          }
        );
        const data = await res.json();
        if (res.ok && data.user) {
          return {
            _id: data.user._id, // Ensure _id is returned here
            email: data.user.email,
            role: data.user.role || 'user',
            name: data.user.name,
          } as User;
        } else {
          throw new Error(data.message || 'Login failed');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_ID as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: process.env.NEXTAUTH_SECRET ?? 'secret',
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/google-login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
            }),
          }
        );

        const data = await res.json();

        if (res.ok && data.data) {
          user._id = data.data._id;

          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    },

    async session({ session, token }) {
      session.user._id = token._id as string;
      session.user.role = token.role as string;

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };

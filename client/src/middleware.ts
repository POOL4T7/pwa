// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/settings']; // Example protected routes

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  // Check if the requested route is one of the protected routes
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If authenticated or route is not protected, continue
  return NextResponse.next();
}

// Apply the middleware to specific routes
export const config = {
  matcher: ['/dashboard', '/profile', '/settings'], // Protected paths
};

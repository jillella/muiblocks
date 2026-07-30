import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('site-auth');
  const isAuthenticated = authCookie?.value === 'authenticated';
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');

  // Allow API routes and static files
  if (isApiRoute) {
    return NextResponse.next();
  }

  // If not authenticated and not on login page, redirect to login and
  // remember where the user was headed so we can send them back after login.
  if (!isAuthenticated && !isLoginPage) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated and on login page, redirect to the original destination
  if (isAuthenticated && isLoginPage) {
    const from = request.nextUrl.searchParams.get('from');
    // Only allow internal paths to avoid an open redirect.
    const target = from && from.startsWith('/') && !from.startsWith('//') ? from : '/';
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)'],
};

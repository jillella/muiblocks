import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const SITE_PASSWORD = process.env.SITE_PASSWORD || 'demo123';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password === SITE_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('site-auth', 'authenticated', {
      httpOnly: true,
      path: '/',
      // The app can be embedded in a cross-site iframe (e.g. the v0 preview).
      // `SameSite=Lax` cookies are not sent on cross-site iframe navigations,
      // which would bounce the user straight back to /login after signing in.
      // `SameSite=None` requires `Secure`, which browsers also honor on localhost.
      sameSite: 'none',
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}

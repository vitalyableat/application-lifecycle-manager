import { NextRequest, NextResponse } from 'next/server';

import { APP_ROUTE } from '@/constants/app-route';
import { COOKIE_NAME } from '@/constants/cookie-name';

export function middleware(request: NextRequest): NextResponse {
  const refreshToken = request.cookies.get(COOKIE_NAME.REFRESH_TOKEN);

  if (request.nextUrl.pathname !== APP_ROUTE.LOGIN && !refreshToken?.value) {
    return NextResponse.redirect(new URL(APP_ROUTE.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};

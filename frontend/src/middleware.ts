import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicPath = path === '/' || path === '/login' || path === '/signUp';
  const token = req.cookies.get('access_access')?.value;
  
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/books', req.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
}

export const config = {
  matcher: ['/', '/books', '/books/:path*', '/signUp']
}
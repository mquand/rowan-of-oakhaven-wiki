import { NextResponse } from 'next/server';

const LOCALES = ['vi', 'en'];
const DEFAULT_LOCALE = 'vi';

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Skip Next internals, API routes, and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return;
  }

  // Check if pathname already starts with a supported locale
  const pathnameHasLocale = LOCALES.some(
    loc => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  );

  if (pathnameHasLocale) return;

  // Determine user's preferred locale from cookie or Accept-Language header
  let targetLocale = DEFAULT_LOCALE;
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale)) {
    targetLocale = cookieLocale;
  } else {
    const acceptLang = request.headers.get('accept-language') || '';
    if (acceptLang.toLowerCase().includes('en') && !acceptLang.toLowerCase().startsWith('vi')) {
      targetLocale = 'en';
    }
  }

  // Rewrite / redirect to localized path
  const newPath = `/${targetLocale}${pathname === '/' ? '' : pathname}`;
  const redirectUrl = new URL(newPath, request.url);
  redirectUrl.search = request.nextUrl.search;
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};

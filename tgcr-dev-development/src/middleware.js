import { NextResponse } from "next/server";
import { i18n } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request) {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales = i18n.locales;
  let languages = new Negotiator({
    headers: negotiatorHeaders,
  }).languages();

  // Filter out empty or obviously invalid values
  languages = languages.filter(
    (lang) => typeof lang === "string" && lang.trim().length > 0
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
  // Logging and request ID logic
  const start = Date.now();
  const requestId = request.headers.get("x-request-id") || crypto.randomUUID();

  // Add metadata to log
  console.log(
    JSON.stringify({
      level: "debug",
      message: "Incoming request",
      http: {
        method: request.method,
        url: request.url,
        user_agent: request.headers.get("user-agent"),
      },
      request_id: requestId,
      timestamp: new Date().toISOString(),
    })
  );

  const response = NextResponse.next();
  response.headers.set("X-Request-ID", requestId);

  // Note: Next.js middleware responses do not support 'finish' event.
  // You may need to log after response is sent in your API/routes instead.
  // response.on("finish", () => {
  //   log.info("Request completed", {
  //     status: response.status,
  //     duration: Date.now() - start,
  //   });
  // });

  return response;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|images|fonts|_next/image|favicon.ico).*)"],
};

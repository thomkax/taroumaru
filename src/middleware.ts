import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";
import { languages } from "./locales/langs";

const I18nMiddleware = createI18nMiddleware({
  locales: Object.keys(languages) as (keyof typeof languages)[],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};

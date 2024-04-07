import { createI18nServer } from "next-international/server";
import { imports } from "./langs";
import en from "./langs/en";

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer(imports, {
    fallbackLocale: en,
  });

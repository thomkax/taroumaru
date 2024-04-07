"use client";
import { createI18nClient } from "next-international/client";
import { imports } from "./langs";
import en from "./langs/en";

const client = createI18nClient(imports, {
  fallbackLocale: en,
});

// Custom types to disable autocompletion
// because typescript shits itself from how many keys there are
const useI18n = client.useI18n as () => {
  (key: string): string;
};

const useScopedI18n = client.useScopedI18n as (scope: string) => {
  (key: string): string;
};

const I18nProviderClient = client.I18nProviderClient;
const useChangeLocale = client.useChangeLocale;
const useCurrentLocale = client.useCurrentLocale;

export {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useChangeLocale,
  useCurrentLocale,
};

"use client";

import * as Category from "./#categories/main";
import * as Achievements from "./#achievements/main";
import * as Search from "./#search/main";
import { useI18n } from "@/locales/client";
import StoreProvider from "./store/storeProvider";

export function Client() {
  const t = useI18n();

  return (
    <main className="flex w-full justify-center">
      <StoreProvider i18n={t} loading={Loading()}>
        <Category.Tab />
        <Achievements.Tab />
        <Search.Tab />
      </StoreProvider>
    </main>
  );
}

function Loading() {
  return (
    <>
      <Category.Loading />
      <Achievements.Loading />
      <Search.Loading />
    </>
  );
}

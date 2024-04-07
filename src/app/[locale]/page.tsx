import { Client } from "./client";
import { I18nProviderClient } from "@/locales/client";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <I18nProviderClient locale={locale}>
      <Client />
    </I18nProviderClient>
  );
}

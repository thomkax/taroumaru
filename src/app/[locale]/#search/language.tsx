import { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import * as Pop from "@radix-ui/react-popover";
import { Drawer as Vaul } from "vaul";
import * as Icons from "@/misc/icons";
import DrawerHandle from "@/misc/drawer-handle";
import Image from "next/image";
import {
  useChangeLocale,
  useCurrentLocale,
  useScopedI18n,
} from "@/locales/client";
import { languages } from "@/locales/langs";

//
// Languages
//

export function Languages({ view }: { view: "tab" | "drawer" }) {
  const Window = view === "drawer" ? Drawer : Popover;
  const langs = Object.keys(languages) as (keyof typeof languages)[];

  return (
    <Window>
      <div className="grid grid-cols-1 gap-y-2">
        {langs.map((key) => (
          <LanguageButton lang={key} key={key} />
        ))}
      </div>
    </Window>
  );
}

function LanguageButton({ lang }: { lang: keyof typeof languages }) {
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();
  const ref = useRef<HTMLLabelElement>(null);

  // Moves view position when rendering the button
  // with current locale
  useEffect(() => {
    if (currentLocale === lang) {
      ref.current?.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      });
    }
  }, []);

  return (
    <label
      htmlFor={lang}
      ref={ref}
      className="grid h-9 grid-cols-[40px_1fr_40px] items-center gap-x-2 rounded-md border border-neutral-600 bg-black px-1 py-1 transition-all hover:bg-neutral-800 has-[:checked]:border-emerald-500 has-[:checked]:text-emerald-300"
    >
      <input
        type="checkbox"
        id={lang}
        onChange={() => changeLocale(lang)}
        checked={currentLocale === lang}
        className="peer hidden"
      />
      <Image
        src={`/images/flags/${lang}.svg`}
        width={40}
        height={40}
        alt="0"
        className="mr-1 inline h-4 w-7 justify-self-end rounded-3xl"
      />
      <span className="select-none">{languages[lang]}</span>
      <Icons.Check className="ml-2 hidden h-5 w-5 peer-checked:inline" />
    </label>
  );
}

//
// Windows
//

function Popover({ children }: { children: React.ReactNode }) {
  return (
    <Pop.Root>
      <Pop.Trigger asChild>
        <TriggerButton />
      </Pop.Trigger>
      <Pop.Portal>
        <Pop.Content
          sideOffset={8}
          align="center"
          className="z-20 h-96 w-72 rounded-xl border border-neutral-500 bg-black p-3 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
        >
          <div className="mb-2 flex select-none items-center justify-between border-b-2 border-neutral-700 px-4 py-2 text-2xl font-semibold">
            Language
            <Pop.Close className="rounded-lg border border-neutral-600 bg-neutral-950 p-1.5 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white">
              <Icons.Cross className="h-6 w-6" />
            </Pop.Close>
          </div>

          <div className="h-[calc(100%-70px)] w-full overflow-y-scroll pr-2">
            {children}
          </div>
        </Pop.Content>
      </Pop.Portal>
    </Pop.Root>
  );
}

function Drawer({ children }: { children: React.ReactNode }) {
  return (
    <Vaul.NestedRoot>
      <Vaul.Trigger asChild>
        <TriggerButton />
      </Vaul.Trigger>
      <Vaul.Portal>
        <Vaul.Overlay className="fixed inset-0 z-20 bg-black/80" />
        <Vaul.Content className="fixed bottom-0 left-0 right-0 z-20 h-[90vh] rounded-tl-xl rounded-tr-xl border-2 border-neutral-700 bg-black">
          <DrawerHandle />
          <div className="mx-auto w-[95%] max-w-96">
            <div className="mb-2 flex items-center justify-between border-b-2 border-neutral-700 p-6 text-2xl font-semibold">
              Langauge
              <Vaul.Close className="rounded-lg border border-neutral-600 bg-neutral-950 p-2 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white">
                <Icons.Cross className="h-6 w-6" />
              </Vaul.Close>
            </div>

            <div className="h-[calc(90vh-160px)] w-full overflow-y-scroll pr-2">
              {children}
            </div>
          </div>
        </Vaul.Content>
      </Vaul.Portal>
    </Vaul.NestedRoot>
  );
}

const TriggerButton = forwardRef(function TriggerButton(
  props: {},
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const t = useScopedI18n("general");

  return (
    <button
      className="h-10 w-36 select-none rounded-md border border-neutral-600 bg-neutral-950 px-4 py-1 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white"
      ref={ref}
      {...props}
    >
      {t("language")}
      <Icons.Translate className="ml-2 inline h-5 w-5" />
    </button>
  );
});

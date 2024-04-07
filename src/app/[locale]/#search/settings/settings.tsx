import { ForwardedRef, forwardRef } from "react";
import * as Dia from "@radix-ui/react-dialog";
import { Drawer as Vaul } from "vaul";
import * as Icons from "@/misc/icons";
import DrawerHandle from "@/misc/drawer-handle";
import Profiles from "./profiles";
import Data from "./data";
import Cloud from "./cloud";
import Link from "next/link";

//
// Settings
//

export function Settings({ view }: { view: "tab" | "drawer" }) {
  const Window = view === "drawer" ? Drawer : Dialog;

  return (
    <Window>
      <div id="app-settings" className="space-y-4">
        <Cloud />
        <Data />
        <Profiles />
        <Credits />
      </div>
    </Window>
  );
}

function Credits() {
  return (
    <Category title="Credits">
      <div>
        Achievement tracker is made by Thomka 🌺.
        <br /> You can report bugs and contribute to this project on GitHub.
      </div>
      <div className="space-x-2">
        <Link
          href="https://github.com/thomkax/taroumaru"
          className="flex h-10 w-36 select-none items-center justify-center rounded-md border border-neutral-600 bg-neutral-950 px-4 py-1 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white"
        >
          GitHub
          <Icons.GitHub className="ml-2 inline h-5 w-5" />
        </Link>
      </div>
    </Category>
  );
}

//
// Windows
//

function Dialog({ children }: { children: React.ReactNode }) {
  return (
    <Dia.Root>
      <Dia.Trigger asChild>
        <TriggerButton />
      </Dia.Trigger>
      <Dia.Portal>
        <Dia.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dia.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] rounded-lg border border-neutral-700  bg-black p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <div className="mb-2 flex select-none items-center justify-between border-b border-neutral-700 px-4 py-2 text-2xl font-semibold">
            Settings
            <Dia.Close className="rounded-lg border border-neutral-600 bg-neutral-950 p-2 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white">
              <Icons.Cross className="h-6 w-6" />
            </Dia.Close>
          </div>

          <div className="max-h-[70vh] w-full overflow-auto overflow-y-scroll pr-2">
            {children}
          </div>
        </Dia.Content>
      </Dia.Portal>
    </Dia.Root>
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
            <div className="mb-2 flex items-center justify-between border-b border-neutral-700 p-6 text-2xl font-semibold">
              Settings
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
  return (
    <button
      className=" h-10 w-10 select-none rounded-md border border-neutral-600 bg-neutral-950 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white"
      ref={ref}
      {...props}
    >
      <Icons.Cog className="inline h-6 w-6" />
    </button>
  );
});

export function Category({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[28px_1fr] gap-y-1">
      <div className="h-2 w-2 rotate-45 place-self-center bg-neutral-200"></div>
      <div className="col-start-2 text-lg font-semibold text-neutral-200">
        {title}
      </div>
      <div className="col-start-2 space-y-2 text-sm text-neutral-300">
        {children}
      </div>
    </div>
  );
}

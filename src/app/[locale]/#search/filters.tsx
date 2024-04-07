"use client";

import DrawerHandle from "@/misc/drawer-handle";
import * as Icons from "@/misc/icons";
import AchievementTag from "@/data/tags";
import versions from "@/data/versions";
import * as Pop from "@radix-ui/react-popover";
import Image from "next/image";
import { ForwardedRef, forwardRef, useMemo } from "react";
import { Drawer as Vaul } from "vaul";
import {
  addTag,
  addVersion,
  removeTag,
  removeVersion,
} from "../store/search.slice";
import { useDispatch, useSelector } from "../store/store";

//
// Versions
//

export function Versions({ view }: { view: "tab" | "drawer" }) {
  const Window = view === "drawer" ? Drawer : Popover;

  return (
    <Window text="Version">
      {versions.map((e, i) => (
        <div
          key={i}
          className="mt-2 grid grid-cols-3 gap-x-2 gap-y-1 border-t-2 border-neutral-700 pt-2 first:mt-0 first:border-t-0 first:pt-0"
        >
          {[...Array(e + 1)].map((_, v) => (
            <VersionButton text={`${i + 1}.${v}`} key={v} />
          ))}
        </div>
      ))}
    </Window>
  );
}

function VersionButton({ text }: { text: string }) {
  const dispatch = useDispatch();
  const checked = useSelector((s) =>
    s.search.value.versions.some((e) => e === text),
  );

  return (
    <label
      htmlFor={text}
      className="flex items-center justify-center rounded-md border border-neutral-600 bg-black px-1 py-1 transition-all hover:bg-neutral-800 has-[:checked]:border-emerald-500 has-[:checked]:text-emerald-300"
    >
      <input
        type="checkbox"
        id={text}
        onChange={(e) =>
          e.target.checked
            ? dispatch(addVersion(text))
            : dispatch(removeVersion(text))
        }
        checked={checked}
        className="peer hidden"
      />
      <span className="select-none">{text}</span>
      <Icons.Check className="ml-2 hidden h-5 w-5 peer-checked:inline" />
    </label>
  );
}

//
// Tags
//

export function Tags({ view }: { view: "tab" | "drawer" }) {
  const Window = view === "drawer" ? Drawer : Popover;

  const tags = useMemo(() => {
    return Object.values(AchievementTag).filter(
      (e): e is string => typeof e === "string",
    );
  }, []);

  return (
    <Window text="Tags">
      <div className="grid grid-cols-1 gap-y-2">
        {tags.map((_, i) => (
          <TagButton tag={i} key={i} />
        ))}
      </div>
    </Window>
  );
}

function TagButton({ tag }: { tag: AchievementTag }) {
  const dispatch = useDispatch();
  const checked = useSelector((s) =>
    s.search.value.tags.some((e) => e === tag),
  );

  const name = AchievementTag[tag];
  const type = tag >= 0 && tag <= 4 ? ".webp" : ".svg";

  return (
    <label
      htmlFor={name}
      className="grid h-9 grid-cols-[35px_1fr_40px] items-center gap-x-2 rounded-md border border-neutral-600 bg-black px-1 py-1 transition-all hover:bg-neutral-800 has-[:checked]:border-emerald-500 has-[:checked]:text-emerald-300"
    >
      <input
        type="checkbox"
        id={name}
        onChange={(e) =>
          e.target.checked ? dispatch(addTag(tag)) : dispatch(removeTag(tag))
        }
        checked={checked}
        className="peer hidden"
      />
      <Image
        src={`/images/tags/${name.toLowerCase()}${type}`}
        width={25}
        height={25}
        alt="0"
        className="mr-1 inline justify-self-end rounded-3xl"
      />
      <span className="select-none">{name}</span>
      <Icons.Check className="ml-2 hidden h-5 w-5 peer-checked:inline" />
    </label>
  );
}

//
// Windows
//

function Popover({
  text,
  children,
}: {
  text: "Version" | "Tags";
  children: React.ReactNode;
}) {
  return (
    <Pop.Root>
      <Pop.Trigger asChild>
        <TriggerButton text={text} />
      </Pop.Trigger>
      <Pop.Portal>
        <Pop.Content
          sideOffset={8}
          align="center"
          className="z-20 h-96 w-72 rounded-xl border border-neutral-500 bg-black p-3 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
        >
          <div className="mb-2 flex select-none items-center justify-between border-b border-neutral-700 px-4 py-2 text-2xl font-semibold">
            Select {text.toLowerCase()}
            <Pop.Close className="rounded-lg border border-neutral-600 bg-neutral-950 p-1.5 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white">
              <Icons.Cross className="h-6 w-6" />
            </Pop.Close>
          </div>

          <div className="h-[calc(100%-70px)] w-full overflow-y-scroll pr-2 ">
            {children}
          </div>
        </Pop.Content>
      </Pop.Portal>
    </Pop.Root>
  );
}

function Drawer({
  text,
  children,
}: {
  text: "Version" | "Tags";
  children: React.ReactNode;
}) {
  return (
    <Vaul.NestedRoot>
      <Vaul.Trigger asChild>
        <TriggerButton text={text} />
      </Vaul.Trigger>
      <Vaul.Portal>
        <Vaul.Overlay className="fixed inset-0 z-20 bg-black/80" />
        <Vaul.Content className="fixed bottom-0 left-0 right-0 z-20 h-[90vh] rounded-tl-xl rounded-tr-xl border-2 border-neutral-700 bg-black">
          <DrawerHandle />
          <div className="mx-auto w-[95%] max-w-96">
            <div className="mb-2 flex items-center justify-between border-b border-neutral-700 p-6 text-2xl font-semibold">
              Select {text.toLowerCase()}
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
  props: {
    text: "Version" | "Tags";
  },
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const checked = useSelector((s) =>
    props.text === "Version"
      ? s.search.value.versions.length > 0
      : s.search.value.tags.length > 0,
  );

  return (
    <button
      className="w-full select-none rounded-md border border-neutral-600 bg-neutral-950 px-4 py-1 transition-all hover:border-neutral-400 hover:bg-neutral-800 data-[selected=true]:border-emerald-500"
      data-selected={checked || undefined}
      ref={ref}
      {...props}
    >
      {props.text}
      {checked ? (
        <Icons.FilledCheck className="ml-2 inline h-5 w-5 text-emerald-500" />
      ) : (
        <Icons.ArrowDown className="ml-2 inline h-5 w-5" />
      )}
    </button>
  );
});

"use client";

import * as Icons from "@/misc/icons";
import { useEffect, useState } from "react";
import { Drawer as Vaul } from "vaul";
import * as Filters from "./filters";
import * as Category from "../#categories/main";
import DrawerHandle from "@/misc/drawer-handle";
import { Languages } from "./language";
import { Settings } from "./settings/settings";
import { useDispatch, useSelector } from "../store/store";
import { setText, toggleHide } from "../store/search.slice";
import { useMediaMD, useMediaXL } from "@/misc/hooks";

function Search({ view }: { view: "tab" | "drawer" }) {
  // Shows category selector if category tab is hidden
  const showCategorySelector = useMediaMD();

  const hideCompletedState = useSelector((s) => s.search.value.hide);
  const searchText = useSelector((s) => s.search.value.text);
  const [textInput, setTextInput] = useState(searchText);
  const dispatch = useDispatch();

  // Delay to not spam filtering functions
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setText(textInput));
    }, 300);

    return () => clearTimeout(timer);
  }, [textInput]);

  return (
    <div className="flex h-full max-h-[calc(80vh-40px)] flex-col items-center justify-between overflow-y-auto xl:max-h-full">
      <div className="w-[95%] max-w-96 xl:w-full">
        <div className="m-6 flex h-10 items-center justify-between">
          <div className="text-2xl font-bold">Search</div>
          {view === "drawer" && (
            <Vaul.Close className="rounded-lg border border-neutral-600 bg-neutral-950 p-2 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white">
              <Icons.Cross className="h-6 w-6" />
            </Vaul.Close>
          )}
        </div>
        <div className="flex flex-col gap-y-4 border-y border-neutral-700 px-1 py-4">
          {showCategorySelector === false && <Category.Drawer />}

          <input
            type="text"
            placeholder="Enter name or description"
            onInput={(e) => setTextInput(e.currentTarget.value)}
            value={textInput}
            className="h-9 w-full rounded-md border border-neutral-600 bg-black px-3 py-1 text-sm transition-colors placeholder:text-neutral-400 hover:border-neutral-400 hover:bg-neutral-950"
          />

          <div className="w-fill grid grid-cols-2 gap-x-2">
            <Filters.Versions view={view} />
            <Filters.Tags view={view} />
          </div>

          <div className="m-auto w-fit select-none">
            <input
              type="checkbox"
              id="hide-completed"
              onChange={() => dispatch(toggleHide())}
              checked={hideCompletedState}
              className="peer hidden"
            />
            <label
              htmlFor="hide-completed"
              className=" [&:hover>svg]:ring-neutral-400 peer-checked:[&:hover>svg]:ring-emerald-400 peer-checked:[&>span]:text-emerald-400 peer-checked:[&>svg]:border-black peer-checked:[&>svg]:bg-emerald-400 peer-checked:[&>svg]:text-black"
            >
              <Icons.Check className="inline h-6 w-6 rounded-md bg-neutral-950 text-transparent ring-1 ring-neutral-700 transition-all" />
              <span className="pl-2 transition-colors">Hide completed</span>
            </label>
          </div>
        </div>
        <div className="mt-4 p-2 text-sm text-neutral-500">
          Tip: press <kbd>Shift</kbd> + click to select multiple achievements.
        </div>
      </div>
      <div className="mb-4 mt-2 flex w-full items-center justify-center gap-x-2">
        <Languages view={view} />
        <Settings view={view} />
      </div>
    </div>
  );
}

function Tab() {
  const visible = useMediaXL();
  if (visible === false) return undefined;

  return (
    <div className="sticky top-0 h-screen w-72 min-w-72 px-1">
      <Search view="tab" />
    </div>
  );
}

function Drawer() {
  return (
    <Vaul.Root>
      <Vaul.Trigger className="pointer-events-auto rounded-lg border border-neutral-500 bg-neutral-950 p-3 transition-all hover:border-neutral-400 hover:bg-neutral-800 md:border-neutral-700 md:p-2">
        <Icons.Search className="inline h-6 w-6" />
      </Vaul.Trigger>
      <Vaul.Portal>
        <Vaul.Overlay className="fixed inset-0 z-20 bg-black/80" />
        <Vaul.Content className="fixed bottom-0 left-0 right-0 z-20 h-[80vh] rounded-tl-xl rounded-tr-xl border-2 border-neutral-700 bg-black">
          <DrawerHandle />
          <Search view="drawer" />
        </Vaul.Content>
      </Vaul.Portal>
    </Vaul.Root>
  );
}

function Loading() {
  return (
    <div className="sticky top-0 hidden h-fit w-72 min-w-72 px-1 xl:block">
      <div className="mx-auto w-[95%] max-w-96 xl:w-full">
        <div className="m-6 flex h-10 items-center justify-between">
          <div className="text-2xl font-bold">Search</div>
        </div>
      </div>
    </div>
  );
}

export { Tab, Drawer, Loading, Search };

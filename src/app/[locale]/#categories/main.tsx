import { useEffect, useMemo, useRef } from "react";
import * as Icons from "@/misc/icons";
import { Drawer as Vaul } from "vaul";
import Image from "next/image";
import * as Search from "../#search/main";
import DrawerHandle from "@/misc/drawer-handle";
import { useI18n } from "@/locales/client";
import { useDispatch, useSelector } from "../store/store";
import { useMediaMD, useMediaXL } from "@/misc/hooks";
import {
  getNonEmptyCategories,
  getSelectedAchs,
  getSelectedCategory,
} from "../store/achs.slice";
import { setCategory } from "../store/search.slice";
import { AchCategory } from "@/data/types";

function List({ view }: { view: "tab" | "drawer" }) {
  const nonEmptyCategories = useSelector(getNonEmptyCategories);
  const isSearchHidden = !useMediaXL();

  const categories = useMemo(() => {
    if (nonEmptyCategories.length === 0) {
      return (
        <div className="mx-auto my-10 w-fit italic text-neutral-600">
          No categories found
        </div>
      );
    }

    return nonEmptyCategories.map((e) => (
      <div key={e.id} className="w-full">
        <Category category={e} view={view} />
      </div>
    ));
  }, [nonEmptyCategories]);

  return (
    <>
      <div className="m-6 flex h-10 items-center justify-between">
        <div className="text-2xl font-bold">Categories</div>

        {view === "tab" && isSearchHidden && <Search.Drawer />}
        {view === "drawer" && (
          <Vaul.Close className="rounded-lg border border-neutral-600 bg-neutral-950 p-2 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white">
            <Icons.Cross className="h-6 w-6" />
          </Vaul.Close>
        )}
      </div>

      <div className="border-y border-neutral-700 py-2">
        <div className="max-h-[calc(90vh-160px)] divide-y divide-neutral-800 overflow-y-scroll pr-1 md:max-h-[calc(100vh-120px)]">
          {categories}
        </div>
      </div>
    </>
  );
}

function Category({
  category,
  view,
}: {
  category: AchCategory;
  view: "tab" | "drawer";
}) {
  const t = useI18n();
  const dispatch = useDispatch();
  const ref = useRef<HTMLButtonElement>(null);

  const filtered = useSelector((s) => s.achs.value.filtered);
  const selected = useSelector((s) => s.search.value.category);
  const totalAchs = category.achs.flat().length;
  const completedAchs = useSelector(
    (s) => s.achs.value.completedAchsPerCategory[category.id],
  );
  const percent = useMemo(() => {
    return calcPercent(completedAchs, totalAchs);
  }, [completedAchs, totalAchs]);

  const Trigger = view === "drawer" ? Vaul.Close : "button";

  // Moves selected category into the view after the achievement filtering
  useEffect(() => {
    if (selected === category.id && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const isInView =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);

      if (isInView === false) {
        ref.current.scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "center",
        });
      }
    }
  }, [filtered]);

  return (
    <Trigger
      onClick={() => dispatch(setCategory(category.id))}
      data-selected={selected === category.id || undefined}
      ref={ref}
      className="my-1 flex w-full select-none rounded-md p-2 text-start transition-colors hover:bg-neutral-800 data-[selected=true]:bg-neutral-800"
    >
      <Image
        src={`/images/categories/${category.id}.webp`}
        width={28}
        height={28}
        alt="0"
        className="mr-1 mt-1 inline h-8 min-w-8"
      />

      <div>
        <div className="inline w-fit font-medium">
          {t(`achs.${category.id}.title`)}
        </div>

        <div className="text-sm text-neutral-400">
          Completed: {completedAchs}/{totalAchs}
          <span
            data-completed={percent >= 100 || undefined}
            className="ml-1 text-sm text-neutral-400 data-[completed=true]:font-semibold data-[completed=true]:text-emerald-400"
          >
            ({percent}%)
          </span>
        </div>
      </div>
    </Trigger>
  );
}

//
// Windows
//

function Tab() {
  const visible = useMediaMD();
  if (visible === false) return;

  return (
    <div className="sticky top-0 h-fit w-72 min-w-72 px-1">
      <List view={"tab"} />
    </div>
  );
}

function Drawer() {
  const t = useI18n();
  const selectedCategory = useSelector(getSelectedCategory);
  const totalAchs = useSelector(getSelectedAchs).length;
  const categoryAchs = useSelector(
    (s) => s.achs.value.completedAchsPerCategory,
  );

  const [completed, percent] = useMemo(() => {
    return [
      categoryAchs[selectedCategory.id],
      calcPercent(categoryAchs[selectedCategory.id], totalAchs),
    ];
  }, [selectedCategory]);

  return (
    <Vaul.NestedRoot>
      <Vaul.Trigger className="flex h-20 w-full items-center justify-center gap-x-4 rounded-lg border border-neutral-600 bg-neutral-950 px-8 transition-all hover:border-neutral-400 hover:bg-neutral-800">
        <Image
          src={`/images/categories/${selectedCategory.id}.webp`}
          width={48}
          height={48}
          alt="0"
          className="inline h-12 min-w-12"
        />

        <div>
          <div className="font-medium">
            {t(`achs.${selectedCategory.id}.title`)}
          </div>

          <div className="text-sm text-neutral-400">
            Completed: {completed}/{totalAchs}
            <span
              data-completed={percent >= 100 || undefined}
              className="ml-1 text-sm text-neutral-400 data-[completed=true]:font-semibold data-[completed=true]:text-emerald-400"
            >
              ({percent}%)
            </span>
          </div>
        </div>
      </Vaul.Trigger>
      <Vaul.Portal>
        <Vaul.Overlay className="fixed inset-0 z-20 bg-black/40" />
        <Vaul.Content className="fixed bottom-0 left-0 right-0 z-20 mt-24 flex h-[90vh] flex-col items-center rounded-t-[10px] border-t-2 border-neutral-700 bg-black">
          <DrawerHandle />
          <div className="w-[95%] max-w-96">
            <List view={"drawer"} />
          </div>
        </Vaul.Content>
      </Vaul.Portal>
    </Vaul.NestedRoot>
  );
}

function Loading() {
  return (
    <div className="sticky top-0 hidden h-fit w-72 min-w-72 px-1 md:block">
      <div className="m-6 flex h-10 items-center justify-between">
        <div className="text-2xl font-bold">Categories</div>
      </div>
    </div>
  );
}

function calcPercent(completed: number, total: number) {
  return Math.floor((completed / total) * 100);
}

export { Tab, Drawer, Loading };

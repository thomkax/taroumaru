import { useMemo } from "react";
import Achievement from "./achievement";
import AchievementGroup from "./achievementGroup";
import * as Search from "../#search/main";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useSelector } from "../store/store";
import Data from "@/data/data.json";
import { getSelectedCategory } from "../store/achs.slice";
import { useMediaMD } from "@/misc/hooks";

function Tab() {
  const showSearchButton = !useMediaMD();

  const selectedCategory = useSelector(getSelectedCategory);
  const totalAchs = useSelector((s) => s.achs.value.totalAchs);
  const totalGems = useSelector((s) => s.achs.value.totalGems);

  const achs = useMemo(() => {
    return selectedCategory.achs.map((ach) =>
      Array.isArray(ach) ? (
        <AchievementGroup
          categoryID={selectedCategory.id}
          achievementGroup={ach}
          key={ach[0].id}
        />
      ) : (
        <Achievement
          categoryID={selectedCategory.id}
          achievement={ach}
          key={ach.id}
        />
      ),
    );
  }, [selectedCategory]);

  const virtualizer = useWindowVirtualizer({
    count: achs.length,
    estimateSize: () => 80,
    overscan: 5,
    scrollMargin: 90,
  });

  const items = virtualizer.getVirtualItems();

  return (
    <div className="min-h-screen w-[768px] border-neutral-700 px-1 md:border-l xl:border-x">
      {showSearchButton && (
        <div className="pointer-events-none sticky top-[calc(100dvh-72px)] z-10 mx-auto mr-4 h-0 text-end">
          <Search.Drawer />
        </div>
      )}

      <div className="sticky -top-7 z-10 grid grid-cols-[1fr_150px] grid-rows-[28px_1fr] gap-1 border-b border-b-neutral-700 bg-black p-2 md:top-0 md:grid-cols-[1fr_200px] md:px-8 md:py-4">
        <div className="col-start-1 row-start-1 text-neutral-400 md:text-2xl md:font-bold md:text-white">
          Achievements
        </div>

        <div className="col-start-1 row-start-2 text-balance text-lg font-semibold text-white md:text-base md:font-medium md:text-neutral-400">
          <span>{selectedCategory.name}</span>
        </div>

        <div className="col-start-2 row-start-2 text-end font-bold text-white md:row-start-1 md:text-2xl">
          {totalAchs} of {Data.totalAchs}
        </div>

        <div className="col-start-2 row-start-1 text-end text-neutral-400 md:row-start-2">
          {totalGems} of {Data.totalGems}
          <span className="primogem ml-1">✦</span>
        </div>
      </div>

      {achs.length > 0 ? (
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
          }}
          className="relative w-full"
        >
          <div
            style={{
              transform: `translateY(${items[0]?.start ?? 0}px)`,
            }}
            className="absolute -top-[80px] left-0 w-full"
          >
            {items.map((item) => (
              <div
                key={item.key}
                data-index={item.index}
                ref={virtualizer.measureElement}
                className="border-b border-b-neutral-800"
              >
                {achs[item.index]}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-12 text-center italic text-neutral-600">
          No achievements found
        </div>
      )}
    </div>
  );
}

function Loading() {
  return (
    <div className="min-h-screen w-[768px] border-neutral-700 px-1 md:border-x">
      <div className="sticky -top-7 grid grid-cols-[1fr_160px] grid-rows-[28px_28px] gap-1 border-b border-b-neutral-700 bg-black p-2 md:top-0 md:px-8 md:py-4">
        <div className="col-start-1 row-start-1 text-neutral-400 md:text-2xl md:font-bold md:text-white">
          Achievements
        </div>
        <div className="col-start-1 row-start-2 h-3 w-48 animate-pulse self-center rounded-full bg-neutral-500 dark:bg-neutral-700"></div>
        <div className="col-start-2 row-start-2 h-2 w-32 animate-pulse self-center justify-self-end rounded-full bg-neutral-500 md:row-start-1 dark:bg-neutral-700"></div>
        <div className="col-start-2 row-start-1 h-2 w-24 animate-pulse self-center justify-self-end rounded-full bg-neutral-500 md:row-start-2 dark:bg-neutral-700"></div>
      </div>
    </div>
  );
}

export { Tab, Loading };

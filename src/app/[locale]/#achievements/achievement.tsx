import { memo, useRef } from "react";
import Checkbox from "./checkbox";
import { useScopedI18n } from "@/locales/client";
import Tasks from "./tasks";
import Title from "./title";
import { Ach } from "@/data/types";
import SearchString from "./searchString";

function Achievement({
  categoryID,
  achievement,
}: {
  categoryID: number;
  achievement: Ach;
}) {
  const t = useScopedI18n(`achs.${categoryID}.${achievement.id}`);
  const name = t("name");
  const desc = t("desc");

  return (
    <div className="grid w-full grid-cols-[27px_auto] gap-x-2 gap-y-2 px-2 py-3">
      <Checkbox
        categoryID={categoryID}
        achievementID={achievement.id}
        reward={achievement.gems}
      />
      <div className="col-start-2 grid grid-cols-[1fr_60px]">
        <Title name={name} achievement={achievement} />

        <div className="flex w-fit items-center gap-x-0.5 place-self-end rounded-full bg-neutral-950 px-2 pl-3">
          <span className="font-medium">{achievement.gems}</span>
          <span className="primogem mx-0.5">✦</span>
        </div>
      </div>
      <div className="col-start-2 text-sm text-neutral-400">
        <SearchString text={desc} />
      </div>

      <Tasks id={achievement.id} />
    </div>
  );
}

export default memo(Achievement);

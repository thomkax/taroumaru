import { Fragment, memo, useRef } from "react";
import Checkbox from "./checkbox";
import { useScopedI18n } from "@/locales/client";
import Title from "./title";
import { AchGroup } from "@/data/types";
import SearchString from "./searchString";

function AchievementGroup({
  categoryID,
  achievementGroup,
}: {
  categoryID: number;
  achievementGroup: AchGroup;
}) {
  const firstAchievement = achievementGroup[0];
  const rewards = achievementGroup.map((e) => e.gems);
  const t = useScopedI18n(`achs.${categoryID}`);

  return (
    <div className="grid w-full grid-cols-[27px_auto] gap-x-2 gap-y-2 px-2 py-3">
      <div className="col-start-2 grid grid-cols-[1fr_140px]">
        <Title
          name={t(`${firstAchievement.id}.name`)}
          achievement={firstAchievement}
        />

        <div className="flex w-fit place-self-end self-end rounded-full bg-neutral-950 px-2">
          {rewards.map((e, i) => (
            <span
              className="border-l-2 border-neutral-700 px-1.5 text-center font-medium first-of-type:border-none"
              key={i}
            >
              {e}
            </span>
          ))}
          <span className="primogem mx-0.5">✦</span>
        </div>
      </div>

      {achievementGroup.map((ach, i) => (
        <Fragment key={ach.id}>
          <Checkbox
            categoryID={categoryID}
            achievementID={ach.id}
            reward={ach.gems}
          />

          <div className="col-start-2 self-center text-sm text-neutral-400">
            <SearchString text={t(`${ach.id}.desc`)} />
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default memo(AchievementGroup);

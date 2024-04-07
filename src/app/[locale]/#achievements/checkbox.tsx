import { MouseEvent, memo, useRef } from "react";
import * as Icons from "@/misc/icons";
import { useDispatch, useSelector } from "../store/store";
import { setCheckbox } from "../store/misc.slice";
import { getSelectedAchs, toggleAchs } from "../store/achs.slice";

function Checkbox({
  categoryID,
  achievementID,
  reward,
}: {
  categoryID: number;
  achievementID: number;
  reward: number;
}) {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const idString = achievementID.toString();
  const checked = useSelector(
    (s) => s.achs.value.achs[s.achs.value.uuid]?.[achievementID] ?? false,
  );
  const lastToggledCheckbox = useSelector((s) => s.misc.value.checkbox);
  const filtered = useSelector(getSelectedAchs);
  const dispatch = useDispatch();

  function toggle(e: MouseEvent<HTMLInputElement>) {
    const state = e.currentTarget.checked;
    const startIndex = filtered.findIndex((e) => e.id === achievementID);
    const endIndex =
      e.shiftKey && lastToggledCheckbox !== -1
        ? filtered.findIndex((e) => e.id === lastToggledCheckbox)
        : startIndex;

    const minIndex = Math.min(startIndex, endIndex);
    const selectedLength = Math.abs(endIndex - startIndex);
    const selectedCheckboxes = filtered.slice(
      minIndex,
      minIndex + selectedLength + 1,
    );

    dispatch(setCheckbox(achievementID));
    dispatch(
      toggleAchs({
        achs: selectedCheckboxes,
        state,
        category: categoryID,
      }),
    );
  }

  return (
    <>
      <label htmlFor={idString} className="checkbox">
        <input
          ref={checkboxRef}
          checked={checked}
          onClick={toggle}
          type="checkbox"
          id={idString}
          value={reward}
          readOnly
        />
        <Icons.FilledCheck />
      </label>
    </>
  );
}

export default memo(Checkbox);

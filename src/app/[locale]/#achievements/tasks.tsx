import { useScopedI18n } from "@/locales/client";
import metadata from "@/data/metadata";
import { useDispatch, useSelector } from "../store/store";
import { toggleTask } from "../store/achs.slice";

export default function Tasks({ id }: { id: number }) {
  const task = metadata[id]?.tasks;

  if (task === undefined) return undefined;

  return (
    <div className="col-start-2 grid w-fit min-w-72 grid-cols-[12px_auto] gap-x-3 gap-y-2 pr-4">
      <div className="col-start-1 col-end-3 flex w-52 text-sm font-semibold text-neutral-300">
        <div className="relative -left-1 mr-1 h-0.5 min-w-[21px] self-center justify-self-center bg-neutral-600"></div>
        Tasks
        <div className="ml-2 inline-block h-0.5 w-full self-center bg-neutral-600"></div>
      </div>
      {[...Array(task)].map((_, i) => (
        <TaskCheckbox key={`${id}.${i}`} achievementID={id} taskID={i} />
      ))}
    </div>
  );
}

function TaskCheckbox({
  achievementID,
  taskID,
}: {
  achievementID: number;
  taskID: number;
}) {
  const t = useScopedI18n(`tasks.${achievementID}`);
  const dispatch = useDispatch();

  const idString = `${achievementID}.${taskID}`;
  const toggled = useSelector(
    (s) =>
      s.achs.value.tasks[s.achs.value.uuid]?.[achievementID]?.[taskID] ?? false,
  );

  return (
    <>
      <label htmlFor={idString} className="task-checkbox">
        <input
          checked={toggled}
          onChange={(_) =>
            dispatch(toggleTask({ ach: achievementID, task: taskID }))
          }
          type="checkbox"
          id={idString}
        />
        <div />
      </label>
      <div className="text-sm text-neutral-400 transition-colors">
        {t(taskID.toString())}
      </div>
    </>
  );
}

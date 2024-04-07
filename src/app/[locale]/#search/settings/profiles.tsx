import {
  ChangeEvent,
  ForwardedRef,
  MouseEvent as ReactMouseEvent,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { Category } from "./settings";
import * as Icons from "@/misc/icons";
import { useDispatch, useSelector } from "../../store/store";
import {
  addProfile,
  deleteProfile,
  moveProfile,
  renameProfile,
  setProfile,
} from "../../store/achs.slice";
import { Profile as TProfile } from "../../store/localStorage";
import * as Dia from "@radix-ui/react-dialog";

export default function Profiles() {
  const profiles = useSelector((s) => s.achs.value.profiles);
  const dispatch = useDispatch();

  return (
    <Category title="Profiles">
      <div>Manage your achievement data profiles.</div>
      <div
        id="profile-list"
        className="relative"
        style={{
          height: profiles.length * 48 - 8,
        }}
      >
        {profiles.map((e, i) => (
          <Profile profile={e} key={i} />
        ))}
      </div>
      <button
        onClick={() => dispatch(addProfile())}
        className="ml-7 flex h-10 w-36 items-center justify-start gap-x-1 rounded-md border border-neutral-600 bg-neutral-950 p-2 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white "
      >
        <Icons.Plus className="h-5 w-5" />
        Add profile
      </button>
    </Category>
  );
}

function Profile({ profile }: { profile: TProfile }) {
  const ref = useRef<HTMLDivElement>(null);
  const uuid = useSelector((s) => s.achs.value.uuid);
  const dispatch = useDispatch();
  const selected = uuid === profile.uuid;

  const [moving, setMoving] = useState(false);
  const [moveDist, setMoveDist] = useState(profile.index * 48);

  function mouseDown(e: ReactMouseEvent) {
    const profileList = document.getElementById("profile-list");
    const profileSection = ref.current;
    if (profileList === null || profileSection === null) return;

    // Removes smooth transition animation on select
    profileSection.classList.toggle("transition-transform", false);

    // Disables cursor text selection during the item movement
    const settingsWindow = document.getElementById("app-settings");
    settingsWindow?.classList.toggle("disable-selection", true);

    // Distance from the top of the profile box to the cursor
    const pressDY = e.clientY - profileSection.getBoundingClientRect().top;

    setMoving(true);
    setMoveDist(profile.index * 48);

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    function mouseMove(e: MouseEvent) {
      // Distance from the top of the profile list to the cursor
      const listDY = e.clientY - profileList!.getBoundingClientRect().top;
      const dY = listDY - pressDY;
      const clamped = Math.min(
        Math.max(dY, 0),
        (profileList!.children.length - 1) * 48,
      );
      const hoverIndex = Math.abs(Math.ceil((clamped - 24) / 48));

      setMoveDist(clamped);
      dispatch(moveProfile({ uuid: profile.uuid, index: hoverIndex }));
    }

    function mouseUp(e: MouseEvent) {
      setMoving(false);

      settingsWindow?.classList.toggle("disable-selection", false);
      profileSection?.classList.toggle("transition-transform", true);

      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    }
  }

  return (
    <div
      ref={ref}
      className="absolute top-0 z-20 flex items-center gap-x-2 transition-transform"
      style={{
        transform: moving
          ? `translateY(${moveDist}px) scale(1.01)`
          : `translateY(${profile.index * 48}px)`,
        zIndex: moving ? "30" : undefined,
      }}
    >
      <Icons.Bars className="h-5 w-5 cursor-move" onMouseDown={mouseDown} />

      <label
        htmlFor={profile.uuid}
        className="flex h-10 w-36 items-center justify-start rounded-md border border-neutral-600 bg-neutral-950 px-2 transition-all hover:border-neutral-400 hover:bg-neutral-800 has-[:checked]:border-emerald-500 has-[:checked]:text-emerald-300 has-[:checked]:hover:border-emerald-300"
      >
        <input
          type="checkbox"
          id={profile.uuid}
          onChange={() => dispatch(setProfile(profile.uuid))}
          checked={selected}
          className="peer hidden"
        />
        <Icons.Check className="hidden h-5 w-5 peer-checked:inline" />
        <div className="ml-1 select-none overflow-hidden text-ellipsis">
          {profile.name}
        </div>
      </label>

      <Edit profile={profile} />
      {selected === false && <Delete profile={profile} />}
    </div>
  );
}

function Edit({ profile }: { profile: TProfile }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(profile.name);
  const [open, setOpen] = useState(false);

  function edit() {
    dispatch(renameProfile({ uuid: profile.uuid, name: name }));
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} title="Edit">
      <div className="w-full space-y-4 p-1">
        <div className="ml-1 text-sm text-neutral-300">
          Enter a new profile name
        </div>
        <input
          type="text"
          placeholder="Enter profile name"
          onInput={(e) => setName(e.currentTarget.value)}
          onKeyDown={(e) => (e.key === "Enter" ? edit() : "")}
          value={name}
          maxLength={20}
          className="h-10 w-full rounded-md border border-neutral-600 bg-black px-3 py-1 text-sm transition-colors placeholder:text-neutral-400 hover:border-neutral-400 hover:bg-neutral-950"
        />
        <div className="flex justify-end gap-x-4">
          <button
            onClick={() => setOpen(false)}
            className="flex h-10 items-center justify-start gap-x-1 rounded-md border border-neutral-600 bg-neutral-950 p-2 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white"
          >
            <Icons.Cross className="h-5 w-5" />
            Cancel
          </button>
          <button
            onClick={() => edit()}
            className="flex h-10 items-center justify-start gap-x-1 rounded-md border border-emerald-500 bg-neutral-950 p-2 text-emerald-300 transition-all hover:border-emerald-400 hover:bg-neutral-800 hover:text-emerald-200 "
          >
            <Icons.Check className="h-5 w-5" />
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
}

function Delete({ profile }: { profile: TProfile }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  function remove() {
    dispatch(deleteProfile(profile.uuid));
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} title="Delete">
      <div className="w-full space-y-4 p-1">
        <div className="ml-1 text-sm text-neutral-300">
          Are you sure you want to delete profile "{profile.name}"?
        </div>
        <div className="flex justify-end gap-x-4">
          <button
            onClick={() => setOpen(false)}
            className="flex h-10 items-center justify-start gap-x-1 rounded-md border border-neutral-600 bg-neutral-950 p-2 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white"
          >
            <Icons.Cross className="h-5 w-5" />
            Cancel
          </button>
          <button
            onClick={() => remove()}
            className="flex h-10 items-center justify-start gap-x-1 rounded-md border border-red-400 bg-neutral-950 px-3 py-2 text-red-400 transition-all hover:border-red-500 hover:bg-neutral-800 "
          >
            <Icons.Delete className="h-5 w-5" />
            Delete
          </button>
        </div>
      </div>
    </Dialog>
  );
}

//
// Windows
//
function Dialog({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: "Edit" | "Delete";
  children: React.ReactNode;
}) {
  return (
    <Dia.Root open={open} onOpenChange={onOpenChange}>
      <Dia.Trigger asChild>
        {title === "Edit" ? <EditButton /> : <DeleteButton />}
      </Dia.Trigger>
      <Dia.Portal>
        <Dia.Overlay className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dia.Content className="fixed left-[50%] top-[50%] z-50 w-[95%] translate-x-[-50%] translate-y-[-50%] rounded-lg border border-neutral-700  bg-black p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] md:max-w-md">
          <div className="mb-2 flex select-none items-center justify-between border-b border-neutral-700 px-4 py-2 text-2xl font-semibold">
            {title}
            <Dia.Close className="rounded-lg border border-neutral-600 bg-neutral-950 p-2 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white">
              <Icons.Cross className="h-6 w-6" />
            </Dia.Close>
          </div>

          <div className="max-h-[50vh] w-full overflow-auto overflow-y-scroll pr-2">
            {children}
          </div>
        </Dia.Content>
      </Dia.Portal>
    </Dia.Root>
  );
}

const EditButton = forwardRef(function EditButton(
  props: {},
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 p-2 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white"
      ref={ref}
      {...props}
    >
      <Icons.Edit className="h-5 w-5" />
    </button>
  );
});

const DeleteButton = forwardRef(function DeleteButton(
  props: {},
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 p-2 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white"
      ref={ref}
      {...props}
    >
      <Icons.Delete className="h-5 w-5 text-red-500" />
    </button>
  );
});

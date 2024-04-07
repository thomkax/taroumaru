import { ChangeEvent, useMemo, useState } from "react";
import { Category } from "./settings";
import * as Icons from "@/misc/icons";
import { useDispatch, useSelector } from "../../store/store";
import { uploadData } from "../../store/achs.slice";

export default function Data() {
  const achs = useSelector((s) => s.achs.value.achs);
  const tasks = useSelector((s) => s.achs.value.tasks);
  const profiles = useSelector((s) => s.achs.value.profiles);

  const downloadURL = useMemo(() => {
    const data = {
      "@profiles": profiles,
      "@achs": achs,
      "@tasks": tasks,
    };

    const stringify = JSON.stringify(data);
    const encoded = encodeURIComponent(stringify);

    return "data:text/plain;charset=utf-8," + encoded;
  }, [achs, tasks, profiles]);

  //
  //
  //
  const [status, setStatus] = useState<"error" | "success" | null>(null);
  const dispatch = useDispatch();

  async function fileUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      let data;

      try {
        data = JSON.parse(await file.text());
      } catch (ex) {
        setStatus("error");
        e.target.value = "";
        return;
      }

      setStatus("success");
      dispatch(uploadData(data));
      e.target.value = "";
    }
  }

  return (
    <Category title="Data">
      <div>Download and upload local achievement and task data.</div>
      <div className="flex gap-x-2">
        <a
          href={downloadURL}
          download={"ach-data.json"}
          className="flex h-10 w-36 select-none items-center justify-center rounded-md border border-neutral-600 bg-neutral-950 px-4 py-1 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white"
        >
          Download
          <Icons.Download className="ml-2 inline h-5 w-5" />
        </a>
        <label
          htmlFor="file-upload"
          className="flex h-10 w-36 select-none items-center justify-center rounded-md border border-neutral-600 bg-neutral-950 px-4 py-1 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white"
        >
          Upload
          <Icons.Upload className="ml-2 inline h-5 w-5" />
        </label>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".json"
          onChange={fileUpload}
        />
      </div>
      {status === "error" && (
        <div className="text-red-400">
          <Icons.Cross className="inline h-5 w-5" />
          <span className="align-middle">
            There was an error while uploading achievement data.
          </span>
        </div>
      )}
      {status === "success" && (
        <div className="text-emerald-400">
          <Icons.Check className="inline h-5 w-5" />
          <span className="align-middle">
            Successfully uploaded achievement data.
          </span>
        </div>
      )}
    </Category>
  );
}

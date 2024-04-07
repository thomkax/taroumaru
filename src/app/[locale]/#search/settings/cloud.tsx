import { Category } from "./settings";
import * as Icons from "@/misc/icons";

export default function Cloud() {
  return (
    <Category title="Google Drive">
      <div>
        By default, your data is saved locally in your browser. Sync with Google
        Drive to save your data in the cloud and be able to use this app across
        the other devices. This app will not be able to access any personal
        information from your Google Account. Saved data is added to profiles.
      </div>
      <div>
        <button className="h-10 w-36 select-none rounded-md border border-neutral-600 bg-neutral-950 px-4 py-1 text-neutral-400 transition-all hover:border-neutral-400 hover:bg-neutral-800 hover:text-white">
          Soon...
          <Icons.Cloud className="ml-2 inline h-5 w-5" />
        </button>
      </div>
    </Category>
  );
}

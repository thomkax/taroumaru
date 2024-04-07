import Link from "next/link";
import metadata from "@/data/metadata";
import Image from "next/image";
import AchievementTag from "@/data/tags";
import { memo } from "react";
import { Ach } from "@/data/types";
import SearchString from "./searchString";

function Title({ name, achievement }: { name: string; achievement: Ach }) {
  const link =
    metadata[achievement.id]?.url ??
    `https://genshin-impact.fandom.com/wiki/${achievement.name}`;

  const tags = metadata[achievement.id]?.tags?.toSorted((a, b) => a - b) ?? [];
  const tagIcons = tags.map((e) => {
    const type = e >= 0 && e <= 4 ? ".webp" : ".svg";
    const name = AchievementTag[e];

    return (
      <Image
        src={`/images/tags/${name.toLowerCase()}${type}`}
        width={20}
        height={20}
        alt="0"
        title={name}
        key={name}
        className="inline"
      />
    );
  });

  return (
    <div className="space-x-1">
      <Link
        href={link}
        target="_blank"
        className="inline font-semibold hover:underline"
      >
        <SearchString text={name} />
      </Link>
      {tagIcons}
      <span className="text-xs italic text-neutral-500">
        {achievement.version}
      </span>
    </div>
  );
}

export default memo(Title);

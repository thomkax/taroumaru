export type Schema = {
  "@achs": Achs;
  "@tasks": Tasks;
  "@profiles": Profile[];
  "@uuid": string;
  "@hide": boolean;
};

type UUID = string;
type AchID = string;
type TaskID = string;

type Achs = Record<UUID, Record<AchID, true>>;
type Tasks = Record<UUID, Record<AchID, Record<TaskID, true>>>;
export type Profile = {
  uuid: UUID;
  name: string;
  index: number;
};

export function get<T extends keyof Schema>(key: T): Schema[T] | undefined {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return undefined;
    return JSON.parse(value);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export function set<T extends keyof Schema>(key: T, value: Schema[T]) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
}

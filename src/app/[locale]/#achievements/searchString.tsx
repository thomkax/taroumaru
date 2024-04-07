import { useSelector } from "../store/store";

export default function SearchString({ text }: { text: string }) {
  const searchText = useSelector((s) => s.search.value.text);
  const startIndex = text.toLowerCase().indexOf(searchText.toLowerCase());
  if (searchText === "" || startIndex === -1) return <>{text}</>;

  const endIndex = startIndex + searchText.length;

  const start = text.slice(0, startIndex);
  const search = text.slice(startIndex, endIndex);
  const end = text.slice(endIndex);

  return (
    <>
      {start}
      <span className="bg-yellow-300 text-black">{search}</span>
      {end}
    </>
  );
}

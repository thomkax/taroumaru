"use client";
import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";
import * as AchsSlice from "./achs.slice";
import * as SearchSlice from "./search.slice";
import * as MiscSlice from "./misc.slice";

export default function StoreProvider({
  i18n,
  loading,
  children,
}: {
  i18n: (key: string) => string;
  loading: React.ReactNode;
  children: React.ReactNode;
}) {
  const storeRef = useRef(makeStore());
  const [mounted, setMounted] = useState(false);

  // Initializes data from local storage / props on mount
  useEffect(() => {
    storeRef.current.dispatch(AchsSlice.init());
    storeRef.current.dispatch(SearchSlice.init());
    storeRef.current.dispatch(MiscSlice.init(i18n));
    setMounted(true);
  }, []);

  if (mounted === false) return loading;
  return <Provider store={storeRef.current}>{children}</Provider>;
}

import { useMediaQuery } from "react-responsive";

const mdQuery = {
  minWidth: 768,
};

const xlQuery = {
  minWidth: 1280,
};

export const useMediaMD = () => useMediaQuery(mdQuery);
export const useMediaXL = () => useMediaQuery(xlQuery);

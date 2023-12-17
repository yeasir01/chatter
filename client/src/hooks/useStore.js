import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import boundStore from "../store";

const devToolsOpt = {
    enabled: process.env.NODE_ENV === "development",
};

const useStore = create(devtools(immer(boundStore), devToolsOpt));

export default useStore;

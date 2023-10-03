import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import globalStore from "../store/globalStore";

const useStore = create(
    devtools(
        immer(globalStore), 
        { enabled: process.env.NODE_ENV === "development" }
    )
);

export default useStore;
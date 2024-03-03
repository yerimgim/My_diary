import { create } from "zustand";
import { createDiarySlice } from "./slice/diarySlice";

const useStore = create((set, get) => ({
	...createDiarySlice(set, get),
}));

export default useStore;

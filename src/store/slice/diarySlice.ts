import axios from "axios";
import { SetState } from "zustand";

interface DiaryState {
	diaryData: object;
	diaryLoading: boolean;
	diaryError: string | null;
	fetchData: () => Promise<void>;
	createData: () => Promise<void>;
}

export const createDiarySlice = (set: DiaryState<SetState>, get) => ({
	diaryData: null,
	diaryLoading: false,
	diaryError: null,
	fetchData: async () => {
		set({ diaryLoading: true, diaryError: null });

		try {
			const data = await fetchDiaryData();
			console.log("data : )", data.data);
			set({ diaryData: data.data, diaryLoading: false });
		} catch (error) {
			set({ diaryError: error.message, diaryLoading: false });
		}
	},
	createData: async (newDiaryData: any) => {
		set({ diaryLoading: true });
		try {
			const createdData = await createDiaryData(newDiaryData);
			console.log("createData", createdData.data);
			console.log("createData", createdData.data);
			set((state) => ({
				diaryData: [...state.diaryData, createdData.data],
				diaryLoading: false,
			}));
		} catch (error) {
			set({ diaryError: error.message, diaryLoading: false });
		}
	},
});

async function fetchDiaryData() {
	// console.log(import.meta.env.VITE_REST_API_KEY);
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_REST_API_KEY}/api/diary-lists`,
		);
		// console.log(response);
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error(
			error.response.data.message ||
				"An error occurred while fetching bears data.",
		);
	}
}

async function createDiaryData(newDiaryData) {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_REST_API_KEY}/api/diary-lists`,
			{ data: newDiaryData },
		);
		console.log(response);

		return response.data;
	} catch (error) {
		console.error("Create diary data failed:", error);
	}
}

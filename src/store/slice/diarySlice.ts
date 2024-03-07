import axios from "axios";
import { SetState } from "zustand";

interface DiaryState {
	diaryData: object;
	diaryLoading: boolean;
	diaryError: string | null;
	fetchData: () => Promise<void>;
	createData: () => Promise<void>;
	deleteData: () => Promise<void>;
}

export const createDiarySlice = (set: DiaryState<SetState>, get) => ({
	diaryData: null,
	diaryLoading: false,
	diaryError: null,
	fetchData: async () => {
		set({ diaryLoading: true, diaryError: null });

		try {
			const data = await fetchDiaryData();
			// console.log("data : )", data.data);
			set({ diaryData: data.data, diaryLoading: false });
		} catch (error) {
			set({ diaryError: error.message, diaryLoading: false });
		}
	},
	createData: async (newDiaryData: any) => {
		set({ diaryLoading: true });
		try {
			const createdData = await createDiaryData(newDiaryData);
			set((state) => ({
				diaryData: [...state.diaryData, createdData.data],
				diaryLoading: false,
			}));
		} catch (error) {
			set({ diaryError: error.message, diaryLoading: false });
		}
	},
	updateData: async (diaryId, newDiaryData) => {
		set({ diaryLoading: true });
		try {
		} catch (error) {
			set({ diaryError: error.message, diaryLoading: false });
		}
	},
	deleteData: async (diaryId) => {
		set({ diaryLoading: true });
		try {
			await deleteDiaryData(diaryId);

			set((state) => ({
				diaryData: state.diaryData.filter((diary) => diary.id !== diaryId),
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

async function updateDiaryData(diaryId, newDiaryData) {
	try {
		// const response = await axios.put(
		// 	`${import.meta.env.VITE_REST_API_KEY}/api/diary-lists/:${diaryId}`,
		// 	{data: id, }
		// )
		// return response.data;
	} catch (error) {
		console.error("Failed..", error);
	}
}

async function deleteDiaryData(diaryId) {
	try {
		const response = await axios.delete(
			`${import.meta.env.VITE_REST_API_KEY}/api/diary-lists/${diaryId}`,
		);
		console.log("response", response);
		return response.data;
	} catch (error) {
		console.error("Failed..", error);
	}
}

import create from "zustand";
import axios from "axios";

const useStore = create((set) => ({
	data: [],
	loading: false,
	hasErrors: false,

	fetch: async (params: any): void => {
		try {
			console.log("response");
			const response = await axios.get("https://example11123.com");
			set((state) => ({ data: (state.data = response.data), loading: false }));
		} catch (error) {
			set(() => ({ hasError: true, loading: false }));
		}
	},
}));

export default useStore;

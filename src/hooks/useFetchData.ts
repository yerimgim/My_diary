// useFetchDiaryData.js
import useStore from "@/store/store";
import { useEffect } from "react";
// import useStore from './store';

const useFetchDiaryData = () => {
	useEffect(() => {
		const fetchData = async () => {
			await useStore.getState().fetchData();
		};

		fetchData();
	}, []);
};

export default useFetchDiaryData;

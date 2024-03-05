import useStore from "@/store/store";

const useSaveDiary = () => {
	const createDiary = useStore((state) => state.createDiary);

	const saveDiary = async (
		selectedEmotion,
		selectedColor,
		diaryContent,
		selectedDay,
	) => {
		const formattedDate = format(selectedDay, "yyyy-MM-dd");
		const newDiaryData = {
			date: formattedDate,
			emotion: selectedEmotion,
			color: selectedColor,
			content: diaryContent,
			// 필요한 나머지 데이터 필드를 여기에 추가하세요.
		};

		try {
			await createDiary(newDiaryData);
			// 성공적으로 저장되었을 때의 로직을 여기에 추가하세요. (예: 알림 표시)
		} catch (error) {
			// 저장 중 에러가 발생했을 때의 로직을 여기에 추가하세요. (예: 에러 메시지 표시)
			console.error("Saving diary failed:", error);
		}
	};

	return saveDiary;
};

export default useSaveDiary;

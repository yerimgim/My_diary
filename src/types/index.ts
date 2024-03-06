interface CustomWindow extends Window {
	// 여기에 custom 속성이나 메서드 추가
}

declare let window: CustomWindow & typeof globalThis;

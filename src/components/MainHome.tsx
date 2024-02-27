const MainHome = () => {
  const handleLogin = (): void => {
    console.log('13');
  };
  return (
    <section className="flex flex-col flex-wrap items-center bg-red-300">
      <img src="/mainImg.png" alt="" />
      <h1 className="font-jalnan">나의 감성일기장</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogin}
      >
        구글 로그인
      </button>
    </section>
  );
};

export default MainHome;

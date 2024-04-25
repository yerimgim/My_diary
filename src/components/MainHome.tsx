import { Button } from '@/components/ui/button';
import { FaGoogle } from 'react-icons/fa';

const MainHome = () => {
  return (
    <section className="flex flex-col flex-wrap items-center justify-center">
      <img src="/mainImg.png" alt="메인 이미지" />
      <h1
        className="font-jalnan text-2xl my-4 pt-6"
        style={{
          background: 'linear-gradient(to top, #FFF7C2 30%, transparent 10%)',
        }}
      >
        Emogeediary
      </h1>
      <Button
        className="bg-[#F9E98D] hover:bg-[#F5E37A] text-[#333] font-bold py-2 px-4 rounded "
        onClick={() => {
          window.location.href = `${import.meta.env.VITE_REST_API_KEY}/api/connect/google`;
        }}
      >
        <FaGoogle className="mr-2" />
        구글 로그인
      </Button>
    </section>
  );
};

export default MainHome;

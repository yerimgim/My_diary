import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage({ textContent = '' }) {
  const navigate = useNavigate();

  const handlePrevPage = () => {
    navigate('/calendar');
  };
  return (
    <div className="font-jalnan flex h-screen items-center">
      <div className="flex flex-col items-center">
        <img src="/mainImg.png" alt="메인 이미지" />

        <h1 className="py-3 text-3xl">앗!</h1>
        <p
          style={{
            background: 'linear-gradient(to top, #FFF7C2 40%, transparent 10%)',
          }}
        >
          {textContent || '에러페이지입니다.'}
        </p>
        <Button
          className="bg-[#F9E98D] hover:bg-[#F5E37A] text-[#333] mt-5"
          onClick={handlePrevPage}
        >
          메인페이지로 돌아가기
        </Button>
      </div>
    </div>
  );
}

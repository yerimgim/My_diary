import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLeft } from 'react-icons/ai';
import useStore from '@/store/store';
import useFetchDiaryData from '@/hooks/useFetchData';

export type DiaryListType = {
  id: string;
  content: string;
  emotion: string;
  date: string;
  year: number;
  month: number;
  day: number;
  timestamp: number;
  color: string;
  weather: string;
};

// 수정버튼, 삭제버튼 추가

const DiaryList = () => {
  const navigate = useNavigate();
  const handlePage = () => {
    navigate('/calendar');
  };
  useFetchDiaryData();
  const { diaryLoading, diaryData } = useStore((state) => state);

  return (
    <section>
      <header className="flex items-center">
        <Button onClick={handlePage} variant="ghost">
          <AiOutlineLeft size={24} color="#000" />
        </Button>
        <h3 className="font-jalnan text-center">2024년 2월</h3>
      </header>
      <main className="w-[400px] mb-3">
        {diaryLoading ? (
          <>is loading .... </>
        ) : (
          diaryData &&
          diaryData.length !== 0 &&
          diaryData.map((diary) => (
            <div
              key={diary.attributes.id}
              className="min-w-full bg-slate-200 mb-3 h-[200px] p-4 rounded-lg"
              style={{
                backgroundColor: diary.attributes.color,
              }}
            >
              <h2 className="text-[35px]">{diary.attributes.emotion}</h2>
              <div className="font-dohyeon">
                {diary.attributes.year}년 {diary.attributes.month}월 {diary.attributes.day}일{' '}
                {diary.attributes.weather}
              </div>
              <div className="font-dohyeon text-[12px] mt-5">{diary.attributes.content}</div>
            </div>
          ))
        )}
      </main>
    </section>
  );
};

export default DiaryList;

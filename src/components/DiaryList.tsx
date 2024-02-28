import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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

export const diaryList: DiaryListType[] = [
  {
    id: '1',
    date: '2024.2.22',
    year: 2024,
    month: 2,
    day: 22,
    emotion: '😀',
    content: '오늘은 날씨가 맑음 바다로 떠나볼까? 산으로 떠나볼까?',
    timestamp: 123123,
    color: '#F9E98D',
    weather: '맑음', // 변경 예정(이모티콘)
  },
  {
    id: '2',
    date: '2024.2.23',
    year: 2024,
    month: 2,
    day: 23,
    emotion: '😀',
    content: '오늘도 날씨가 맑음 기분최고 산책으로 공원 한바퀴 돌고 옵니다',
    timestamp: 123124,
    color: '#F9E98D',
    weather: '맑음',
  },
  {
    id: '3',
    date: '2024.2.25',
    year: 2024,
    month: 2,
    day: 25,
    emotion: '😎',
    content:
      '한강가자! 한강에서 라면도 맛나게 먹고, 자전거타고 한강공원 한바퀴 돌면 얼마나 좋게요?',
    timestamp: 123125,
    color: '#8CB38B',
    weather: '맑음',
  },
];

const DiaryList = () => {
  const navigate = useNavigate();
  const handlePage = () => {
    navigate('/calendar');
  };
  return (
    <section>
      <header>
        <Button onClick={handlePage}> 캘린더로 돌아가기 </Button>
        <h3 className="font-jalnan text-center">2024</h3>
      </header>
      <main className="w-[400px] mb-3">
        {diaryList.map((diary) => (
          <div
            key={diary.id}
            className="min-w-full bg-slate-200 mb-3 h-[200px] p-4 rounded-lg"
            style={{
              backgroundColor: diary.color,
            }}
          >
            <h2 className="text-[35px]">{diary.emotion}</h2>
            <div className="font-dohyeon">
              {diary.year}년 {diary.month}월 {diary.day}일 {diary.weather}
            </div>
            <div className="font-dohyeon text-[12px] mt-5">{diary.content}</div>
          </div>
        ))}
      </main>
    </section>
  );
};

export default DiaryList;

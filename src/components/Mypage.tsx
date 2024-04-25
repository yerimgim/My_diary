import { useEffect, useState } from 'react';
import HeaderLayout from './HeaderLayout';
import { Button } from './ui/button';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Separator } from '@/components/ui/separator';
import useStore from '@/store/store';
import useFetchDiaryData from '@/hooks/useFetchData';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

type UserType = {
  avartar?: string;
  blocked?: boolean;
  confirmed: boolean;
  createdAt: Date;
  displayName: string;
  email: string;
  id: number;
  provider: string;
  updatedAt: Date;
  username: string;
};

const Mypage = () => {
  const [user, setUser] = useState<UserType>();
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = localStorage.getItem('user');

    if (authUser) {
      setUser(JSON.parse(authUser));
    }
  }, []);

  useFetchDiaryData();
  const { diaryData } = useStore((state) => state) || {};

  const emotionCounts =
    diaryData?.reduce((acc, item) => {
      const emotion = item?.attributes?.emotion;
      const color = item?.attributes?.color;

      if (acc[emotion]) {
        acc[emotion].count += 1;
      } else {
        acc[emotion] = { count: 1, color: color };
      }

      return acc;
    }, {}) || {};

  const sortedEmotions = Object.entries(emotionCounts)
    .map(([emotion, data]) => ({
      emotion,
      count: data.count,
      color: data.color,
    }))
    .sort((a, b) => b.count - a.count);

  // 정렬된 배열에서 labels, data, colors를 추출합니다.
  const labels = sortedEmotions.map((item) => item.emotion);
  const emotionList = sortedEmotions.map((item) => item.count);
  const colors = sortedEmotions.map((item) => item.color);

  return (
    <div className="w-[340px] h-[800px]">
      <HeaderLayout />
      <section className="my-5">
        <h3 className="font-jalnan text-sm mb-3">내 정보</h3>
        <div className="flex items-center">
          <Button className="w-10 h-10 bg-slate-300 flex justify-center  rounded-full text-xs mr-5">
            {user ? user.username || user.displayName : ''}
          </Button>
          <div className="font-dohyeon text-[12px]">
            <div>{user?.username} 님</div>
            <div className="text-[#5e5e5e]">{user?.email}</div>
          </div>
        </div>
        {diaryData && diaryData.length !== 0 && (
          <div className="text-xs text-[#8d8c8c] mt-3">
            🎉 emogeediary와 함께한지 {diaryData.length}일이 되었어요.
          </div>
        )}
      </section>
      <Separator />

      <section className="my-3">
        <h3 className="mb-3 font-jalnan text-sm">나의 기분 통계</h3>
        <div className="flex flex-col items-center">
          <AssetDoughnutChart labels={labels} emotionList={emotionList} colors={colors} />
          {diaryData && diaryData.length !== 0 && (
            <div className="text-xs text-[#8d8c8c] m-3">
              지금까지 <span className="font-jalnan">{diaryData.length}</span>번 기록하셨어요.
            </div>
          )}

          <Button className="w-full" onClick={() => navigate('/myEmotionRecord')}>
            자세히 보기
          </Button>
        </div>
      </section>
      <Separator />
      <section className="my-3">
        <h3 className="font-jalnan text-sm mb-3">폰트</h3>
      </section>
      <Separator />
      <section className="my-3">
        <h3 className="font-jalnan text-sm mb-3">다크모드</h3>
      </section>
      <Separator />
      <section className="my-3">
        <h3 className="font-jalnan text-sm mb-3">백업/복원</h3>
      </section>
    </div>
  );
};
export default Mypage;

export function AssetDoughnutChart({ labels, emotionList, colors }) {
  const data = {
    labels,
    datasets: [
      {
        data: emotionList,
        backgroundColor: colors,
        borderColor: colors,
        circumference: 180, // 도넛 반 자르기
        rotation: 270, // 도넛 돌리기
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Chart.js 레전드 비활성화
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.formattedValue}%`,
        },
      },
    },
    maintainAspectRatio: true,
  };

  return (
    <main className="w-full flex flex-col items-center">
      <div className="w-1/2">
        <Doughnut data={data} options={options} />
      </div>
      <div className="w-full text-center">
        {data.labels.map((label, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <span key={index} className="inline-block m-2">
            <span
              style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
              className="w-4 h-4 inline-block mr-2"
            ></span>
            {label}
          </span>
        ))}
      </div>
    </main>
  );
}

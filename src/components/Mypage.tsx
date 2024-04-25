import { useEffect, useState } from 'react';
import HeaderLayout from './HeaderLayout';
import { Button } from './ui/button';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

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

  useEffect(() => {
    const authUser = localStorage.getItem('user');

    if (authUser) {
      setUser(JSON.parse(authUser));
    }
  }, []);
  return (
    <div className="w-[340px] h-[800px]">
      <HeaderLayout />
      <section className="flex items-center">
        <Button className="w-10 h-10 bg-slate-300 flex justify-center items-center rounded-full text-xs mr-5">
          {user ? user.username || user.displayName : ''}
        </Button>
        <div>
          <div>{user?.username}</div>
          <div>{user?.email}</div>
        </div>
      </section>
      <section>
        <Button variant="link" className="text-right">
          자세히보기
        </Button>
        <AssetDoughnutChart />
      </section>
      <Button>백업버튼</Button>
    </div>
  );
};
export default Mypage;

export function AssetDoughnutChart() {
  const Data = {
    labels: ['😀', '2', '3'],
    datasets: [
      {
        data: [40, 20, 35],
        backgroundColor: ['#ffeb9b', '#b5f2ff', '#c5f2ba'],
        borderColor: ['#ffeb9b', '#b5f2ff', '#c5f2ba'],
        circumference: 180, // 도넛 반 자르기
        rotation: 270, // 도넛 돌리기
      },
    ],
  };
  const Options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: { dataIndex: string; formattedValue: string }): string =>
            `${context.formattedValue}%`,
        },
      },
    },
  };

  return (
    <main>
      <Doughnut data={Data} options={Options} />
    </main>
  );
}

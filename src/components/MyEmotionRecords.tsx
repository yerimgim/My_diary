import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
// import { AiOutlineLeft } from 'react-icons/ai';
import HeaderLayout from './HeaderLayout';
ChartJS.register(ArcElement, Tooltip, Legend);

const MyEmotionRecords = () => {
  // const navigate = useNavigate();
  // const handlePage = () => {
  //   navigate('/calendar');
  // };
  const { state } = useLocation();

  const { emotionList, colors, labels } = state;

  const data = {
    labels,
    datasets: [
      {
        data: emotionList,
        backgroundColor: colors,
        borderColor: colors,
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
    <div className="w-[340px] h-[800px]">
      {/* <Button onClick={handlePage} variant="ghost" className="">
        <AiOutlineLeft size={24} color="#000" />
      </Button> */}
      <HeaderLayout />

      <h3
        className="font-jalnan text-sm mb-3 inline-block"
        style={{
          background: 'linear-gradient(to top, #FFF7C2 30%, transparent 10%)',
        }}
      >
        나의 감정 살펴보기
      </h3>
      <main className="w-full flex flex-col items-center my-5">
        <div className="w-1/2">
          <Doughnut data={data} options={options} />
        </div>
      </main>
      <ul>
        <li className="p-3 bg-[#F7F8F9] rounded-md font-dohyeon text-sm align-middle">
          <span>{labels[0]}</span> 감정을
          <span style={{ color: `${colors[0]}` }}> {emotionList[0]}</span>번 선택했어요!
        </li>
      </ul>
    </div>
  );
};

export default MyEmotionRecords;

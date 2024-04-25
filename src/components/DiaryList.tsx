import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from '@/store/store';
import useFetchDiaryData from '@/hooks/useFetchData';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import HeaderLayout from './HeaderLayout';
import { useEffect, useState } from 'react';

export type DiaryListType = {
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

type DeleteDiaryType = {
  updateData: (diaryId: string) => void;
  deleteData: (diaryId: number) => void; // Add the deleteData property
};

const DiaryList = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useFetchDiaryData();
  const { diaryLoading, diaryData } = useStore((state) => state);
  const handleEditDiary = (diaryid, diary) => {
    navigate('/diary', { state: { diaryid, diary, isEdit: true } });
  };

  const handleSelectedDiary = (diaryId: number) => {
    (useStore.getState() as DeleteDiaryType).deleteData(diaryId);
  };

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = diaryData
      .filter(
        (diary) => diary.attributes.year === state.year && diary.attributes.month === state.month,
      )
      .sort((a, b) => b.attributes.day - a.attributes.day);

    // console.log(filtered);

    setFilteredData(filtered);
  }, [diaryData, state.year, state.month]);

  return (
    <section className="relative">
      <HeaderLayout>
        <header className="flex items-center">
          <h3 className="font-jalnan text-center">
            {state.year}년 {state.month + 1}월
          </h3>
        </header>
      </HeaderLayout>

      <main className="w-[400px] h-[800px] mb-3">
        {diaryLoading ? (
          <>loading .... </>
        ) : (
          filteredData &&
          filteredData.length !== 0 &&
          filteredData.map((diary) => (
            <div
              key={diary.id}
              className="min-w-full bg-slate-200 mb-3 h-[200px] p-4 rounded-lg"
              style={{
                backgroundColor: diary.attributes.color,
              }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-[35px]">{diary.attributes.emotion}</h2>
                <div>
                  <Button variant="link" className="px-1">
                    <MdModeEdit
                      size={24}
                      onClick={() => handleEditDiary(diary.id, diary.attributes)}
                    />
                  </Button>
                  <Button variant="link" className="px-1">
                    <MdDelete size={24} onClick={() => handleSelectedDiary(diary.id)} />
                  </Button>
                </div>
              </div>

              <div className="font-dohyeon">
                {diary.attributes.year}년 {diary.attributes.month + 1}월 {diary.attributes.day}일{' '}
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

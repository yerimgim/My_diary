import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React, { useEffect, useState } from 'react';
import useStore from '@/store/store';

type EmotionTypeList = {
  id: string;
  emotion: string;
  color: string;
};

type DiaryDataType = {
  date: Date;
  emotion: string;
  color: string;
  content: string;
  year: number;
  month: number;
  day: number;
};

type DiaryType = {
  updateData: (diaryId: string, newData: DiaryDataType) => void;
  createData: (newData: DiaryDataType) => void;
};

export const emotionList: EmotionTypeList[] = [
  { id: '1', emotion: '😀', color: '#F9E98D' },
  { id: '2', emotion: '🥲', color: '#D9D9D9' },
  { id: '3', emotion: '😅', color: '#ADD4E8' },
  { id: '4', emotion: '😎', color: '#8CB38B' },
  { id: '5', emotion: '🥳', color: '#FFA96B' },
  { id: '6', emotion: '🤯', color: '#CCB3F5' },
  { id: '7', emotion: '🤬', color: '#F99A8D' },
  { id: '8', emotion: '😵‍💫', color: '#A0B3F5' },
  { id: '9', emotion: '🥸', color: '#FBD164' },
  { id: '10', emotion: '🤒', color: '#F98DC1' },
  { id: '11', emotion: '😴', color: '#D2E3A2' },
];

type UserInfo = {
  avartar?: string | undefined;
  id: number;
  username: string;
  blocked?: boolean;
  confirmed?: boolean;
  createdAt?: Date;
  displayName?: string;
  email: string;
  provider?: string;
  updatedAt: Date;
};
const Diary = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClose = (): void => {
    navigate('/calendar');
  };

  const [user, setUser] = useState<UserInfo>();

  useEffect(() => {
    if (!user) {
      const parsedUserInfo = JSON.parse(localStorage.getItem('user') as string);
      setUser(parsedUserInfo);
    }
  }, [user]);

  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const [diaryContent, setDiaryContent] = useState(state.isEdit ? state.diary.content : '');
  // console.log(state);

  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDiaryContent(event.target.value);
  };

  const saveDiary = (emotion: string, color: string, content: string) => {
    const newDiaryData = {
      date: state.formattedDate,
      emotion: emotion || state.diary.emotion,
      color: color || state.diary.color,
      content,
      year: state.year,
      month: state.month,
      day: state.date,
    };

    if (state.isEdit) {
      (useStore.getState() as DiaryType).updateData(state.diaryid, newDiaryData);
    } else {
      (useStore.getState() as DiaryType).createData(newDiaryData);
    }

    navigate('/calendar');
  };

  return (
    <section className="w-[800px] h-[800px] flex flex-col justify-between absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg overflow-hidden transform transition-all m-4 max-w-lg p-6 po">
      <section>
        <h3
          className="font-jalnan inline-block "
          style={{
            background: 'linear-gradient(to top, #FFF7C2 30%, transparent 10%)',
          }}
        >
          {user?.username || ''}, <br /> 오늘의 기분은 어떤가요?
        </h3>
        <ScrollArea className="w-100 whitespace-nowrap rounded-md ">
          <div className="flex w-max space-x-4 py-3">
            {emotionList.map((emotion) => (
              <div key={emotion.id}>
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <div
                  className="w-[55px] h-[55px] text-[38px] text-center rounded-md focus:ring focus:ring-violet-300 "
                  style={{
                    backgroundColor: emotion.color,
                  }}
                  onClick={() => {
                    setSelectedEmotion(emotion.emotion);
                    setSelectedColor(emotion.color);
                  }}
                >
                  {emotion.emotion}
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
      <section>
        <h3
          className="font-jalnan inline-block"
          style={{
            background: 'linear-gradient(to top, #FFF7C2 30%, transparent 65%)',
          }}
        >
          오늘을 정리해보세요!
        </h3>
        <div className="grid w-full gap-2">
          <Textarea
            placeholder="Type your message here."
            className="my-3 h-[400px]"
            value={diaryContent}
            onChange={onChangeContent}
          />
        </div>
      </section>
      <section>
        <div className="mt-4 flex justify-center">
          <Button
            className="mx-1"
            onClick={() => {
              saveDiary(selectedEmotion, selectedColor, diaryContent);
            }}
          >
            등록
          </Button>
          <Button
            onClick={handleClose}
            className="px-4 py-2 mx-1 bg-gray-500 text-white text-base font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            닫기
          </Button>
        </div>
      </section>
    </section>
  );
};

export default Diary;

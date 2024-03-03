import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface DiaryProps {
  isOpen?: any;
  onClose?: any;
  selectedDay?: any;
  saveDiary?: any;
}

export interface EmotionTypeList {
  id: string;
  emotion: string;
  color: string;
}

export const emotionList: EmotionTypeList[] = [
  { id: '1', emotion: '😀', color: '#F9E98D' },
  { id: '2', emotion: '🥲', color: '#D9D9D9' },
  { id: '3', emotion: '😅', color: '#ADD4E8' },
  { id: '4', emotion: '😎', color: '#8CB38B' },
  { id: '5', emotion: '🥳', color: '#FFA96B' },
  { id: '6', emotion: '🤯', color: '#CCB3F5' },
  { id: '7', emotion: '🤬', color: '#F99A8D' },
  { id: '8', emotion: '😵‍💫', color: '#A0B3F5' },
];

const Diary = ({ isOpen, onClose, selectedDay, saveDiary }: DiaryProps) => {
  if (!isOpen) return null;
  const navigate = useNavigate();
  const handleSave = (): void => {
    console.log('save button');
    navigate('/calendar');
  };
  const handleClose = (): void => {
    console.log('close button');
    navigate('/calendar');
  };

  const [user, setUser] = useState<string>('');
  const [date, setDate] = useState<Date>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  // if (date) {
  //   const formatdate = format(date, 'yyyy-MM-dd HH:mm:ss.SSS');
  //   const year = getYear(formatdate);
  //   const month = getMonth(formatdatedate);
  //   const day = getDay(formatdate);

  //   console.log(year, month, day);
  // }

  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const [diaryContent, setDiaryContent] = useState('');

  const onChangeContent = (e) => {
    setDiaryContent(e.target.value);
  };

  return (
    <section className="w-[800px] h-[800px] flex flex-col justify-between absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg overflow-hidden transform transition-all m-4 max-w-lg p-6 po">
      <section>
        {/* <span className="block font-dohyeon text-[#999] mb-3">2024년 2월 xx일 맑음</span> */}

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
            onChange={onChangeContent}
          />
        </div>
      </section>
      <section>
        <div className="mt-4 flex justify-center">
          <Button
            onClick={() => {
              saveDiary({
                emotion: selectedEmotion,
                color: selectedColor,
                content: diaryContent,
              });

              onClose(isOpen);
            }}
          >
            등록
          </Button>
          <Button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            닫기
          </Button>
        </div>
      </section>
    </section>
  );
};

export default Diary;

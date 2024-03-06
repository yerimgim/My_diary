import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import useStore from '@/store/store';
import useFetchDiaryData from '@/hooks/useFetchData';
import Diary from '@/components/Diary';
import { format, getYear, getMonth, getDate } from 'date-fns';
import DiaryList from './DiaryList';

function Calendar() {
  const [selectedDay, setSelectedDay] = useState(null);
  useFetchDiaryData();

  const { diaryData } = useStore((state) => state);
  const [modifiers, setModifiers] = useState({});
  const [modifiersStyles, setModifiersStyles] = useState({});

  useEffect(() => {
    const newModifiers = {};
    const newModifiersStyles = {};

    diaryData?.forEach((diary) => {
      const { year, month, day, color } = diary.attributes;
      const dateKey = `day-${year}-${month}-${day}`;
      const date = new Date(year, month, day);

      newModifiers[dateKey] = date;
      newModifiersStyles[dateKey] = { backgroundColor: color };
    });

    setModifiers(newModifiers);
    setModifiersStyles(newModifiersStyles);
  }, [diaryData]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleModal = () => setIsOpen(!isOpen);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    if (!isOpen) setIsOpen(true);
  };

  const saveDiary = ({ emotion = '', color = '', content = '' }) => {
    const formattedDate = format(selectedDay, 'yyyy-MM-dd');
    const year = getYear(formattedDate);
    const month = getMonth(formattedDate);
    const day = getDate(formattedDate);

    console.log(formattedDate);

    const newDiaryData = {
      date: formattedDate,
      emotion,
      color,
      content,
      year,
      month,
      day,
    };

    useStore.getState().createData(newDiaryData);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const disabledDays = { after: today };

  // console.log('selectedDay', selectedDay || '');
  // const aa = format(selectedDay, 'yyyyMMdd') ?? '';
  // console.log(aa);
  //
  const selectedDayDataExists = diaryData?.some(({ attributes }) => {
    let formattedDate;
    if (selectedDay) {
      formattedDate = format(selectedDay, 'yyyyMd');
    }
    const date = `${attributes.year}${attributes.month + 1}${attributes.day}`;
    return formattedDate === date;
  });

  return (
    <div className="flex h-[800px] items-center custom-day-picker">
      <DayPicker
        mode="single"
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        onSelect={handleDayClick}
        disabled={disabledDays}
        footer={
          selectedDay ? (
            selectedDayDataExists ? (
              <DiaryList />
            ) : (
              <Diary
                isOpen={isOpen}
                onClose={toggleModal}
                selectedDay={selectedDay}
                saveDiary={saveDiary}
              />
            )
          ) : (
            <p className="text-center font-jalnan">날짜를 선택하여 일기를 작성하세요.!</p>
          )
        }
      />
    </div>
  );
}

export default Calendar;

import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import useStore from '@/store/store';
import useFetchDiaryData from '@/hooks/useFetchData';
import { format, getYear, getMonth, getDate, getDay } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import HeaderLayout from '@/components/HeaderLayout';

type DiaryDataType = {
  color: string;
  content: string;
  createdAt: Date;
  day: number;
  emotion: string;
  date: Date;
  year: number;
  month: number;
  weather?: string;
  updatedAt: Date;
  pubulishedAt: Date;
};
function Calendar() {
  const [selectedDay, setSelectedDay] = useState<Date>();
  useFetchDiaryData();

  const { diaryData } = useStore((state) => state);

  const [modifiers, setModifiers] = useState({});
  const [modifiersStyles, setModifiersStyles] = useState({});

  useEffect(() => {
    const newModifiers: { [key: string]: Date } = {};
    const newModifiersStyles: { [key: string]: React.CSSProperties } = {};

    // biome-ignore lint/complexity/noForEach: <explanation>
    diaryData?.forEach((diary: { attributes: DiaryDataType }) => {
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

  const handleDayClick = (day: Date | undefined): void => {
    setSelectedDay(day);
    if (!isOpen) setIsOpen(true);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const disabledDays = { after: today };

  const selectedDayDataExists = diaryData?.some(({ attributes }: { attributes: DiaryDataType }) => {
    let formattedDate: string | undefined;
    if (selectedDay) {
      formattedDate = format(selectedDay, 'yyyyMd');
    }
    const date = `${attributes.year}${attributes.month + 1}${attributes.day}`;
    return formattedDate === date;
  });

  const navigate = useNavigate();
  const formattedDate = selectedDay ? format(selectedDay, 'yyyy-MM-dd') : '';
  const year = getYear(formattedDate);
  const month = getMonth(formattedDate);
  const date = getDate(formattedDate); // 12일
  const day = getDay(formattedDate); //   수요일

  useEffect(() => {
    if (selectedDay && selectedDayDataExists) {
      navigate('/diaryList', { state: { year, month } });
    } else if (selectedDay && !selectedDayDataExists) {
      navigate('/diary', { state: { formattedDate, year, month, date, day } });
    }
  }, [selectedDay, selectedDayDataExists, navigate, year, month, formattedDate, date, day]);

  return (
    <>
      <HeaderLayout />
      <div className="flex h-[800px] items-center custom-day-picker">
        <DayPicker
          mode="single"
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          onSelect={handleDayClick}
          disabled={disabledDays}
        />
      </div>
    </>
  );
}

export default Calendar;

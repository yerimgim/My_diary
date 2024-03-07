import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import useStore from '@/store/store';
import useFetchDiaryData from '@/hooks/useFetchData';
import { format, getYear, getMonth, getDate, getDay } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import HeaderLayout from '@/components/HeaderLayout';

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
  // const toggleModal = () => setIsOpen(!isOpen);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    if (!isOpen) setIsOpen(true);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const disabledDays = { after: today };

  //
  const selectedDayDataExists = diaryData?.some(({ attributes }) => {
    let formattedDate;
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
  }, [selectedDay, selectedDayDataExists, navigate]);

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

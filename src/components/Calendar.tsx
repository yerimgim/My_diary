import { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSaturday,
  isSunday,
} from 'date-fns';

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import './Calendar.css';
// import DiaryDialog from "./DiaryDialog";
import constants from '@/utils/contants';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); // 현재 달 (2024-01)
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const week = constants.WEEK;

  const weeks = week.map((item, index) => {
    return (
      <div className="week" key={index}>
        {item}
      </div>
    );
  });

  const day = [];
  let startDay = startDate;
  let days = [];
  let formattedDate = '';

  while (startDay <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(startDay, 'd');
      days.push(
        <div className="day">
          <span
            className="day-span"
            style={{
              color:
                format(currentDate, 'M') !== format(startDay, 'M')
                  ? '#ddd'
                  : isSunday(startDay)
                  ? 'red'
                  : isSaturday(startDay)
                  ? 'blue'
                  : '#000',
            }}
          >
            {formattedDate}
          </span>
        </div>,
      );
      startDay = addDays(startDay, 1);
    }

    day.push(
      <div key={startDay} className="day-box">
        {days}
      </div>,
    );

    days = [];
  }
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const navigate = useNavigate();
  const handleInfo = (): void => {
    // setIsOpen(!isOpen);
    navigate('/diary');
  };

  const toggleModal = () => setIsOpen(!isOpen);
  const handleSave = () => {
    console.log(1);
  };

  return (
    <>
      <section className="layout">
        <header className="header">
          <button onClick={prevMonth} className="button">
            <AiOutlineLeft size={24} color="#000" />
          </button>
          <div className="flex flex-col items-center">
            <h2 className="text-center font-jalnan">{format(currentDate, 'yyyy')}</h2>

            <h1 className="font-jalnan text-[25px]">{format(currentDate, 'M')}월</h1>
          </div>
          <button onClick={nextMonth}>
            <AiOutlineRight size={24} color="#000" />
          </button>
        </header>
        <div className="calendar-box">
          <div className="calendar-box">
            <div className="week-layout">{weeks}</div>
            <div className="day-layout" onClick={handleInfo}>
              {day}
            </div>
          </div>
        </div>
      </section>
      {/* {isOpen && (
        <Diary isOpen={isOpen} onClose={toggleModal} onSave={handleSave}>
          {/* <DiaryDialog /> 
        </Diary>
      )} */}
    </>
  );
};

export default Calendar;

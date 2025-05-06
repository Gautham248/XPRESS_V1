import { useState, useEffect } from 'react';
import CalendarSidebar from './CalendarSidebar';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import CalendarDataProvider from './CalendarDataProvider';
import ModalComponent from './CalendarMoal/CalendarModalProps';
import { CalendarDay, CalendarView } from './types';

const AdminCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weekStartDate, setWeekStartDate] = useState<Date>(
    getWeekStartDate(new Date())
  );
  const [showMonthSelector, setShowMonthSelector] = useState<boolean>(false);
  const [calendarView, setCalendarView] = useState<CalendarView>('day');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  function getWeekStartDate(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  }

  function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function handlePrevMonth() {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  }

  function handleNextMonth() {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  }

  function toggleMonthSelector() {
    setShowMonthSelector(!showMonthSelector);
  }

  function handlePrevWeek() {
    setWeekStartDate((prevWeek) => addDays(prevWeek, -7));
  }

  function handleNextWeek() {
    setWeekStartDate((prevWeek) => addDays(prevWeek, 7));
  }

  function handlePrevDay() {
    setSelectedDate((prevDate) => addDays(prevDate, -1));
  }

  function handleNextDay() {
    setSelectedDate((prevDate) => addDays(prevDate, 1));
  }

  function handleDateSelect(date: Date): void {
    setSelectedDate(date);
    const newWeekStartDate = getWeekStartDate(new Date(date));
    setWeekStartDate(newWeekStartDate);

    if (calendarView === 'day') {
      setTimeout(() => {
        const elem = document.querySelector('.calendar-grid');
        if (elem) elem.scrollTop = 0;
      }, 0);
    }
  }

  function handleEventClick(requestId: string): void {
    // Set the selected request ID to show the modal
    setSelectedRequestId(requestId);
  }

  function handleCloseModal(): void {
    // Clear the selected request ID to hide the modal
    setSelectedRequestId(null);
  }

  function generateMonthDays(): CalendarDay[] {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay();

    const daysArray: CalendarDay[] = [];

    for (let i = 0; i < startDay; i++) {
      const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
      daysArray.push({
        date: new Date(year, month - 1, lastDayOfPrevMonth - startDay + i + 1),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    const remainingDays = 42 - daysArray.length;
    for (let i = 1; i <= remainingDays; i++) {
      daysArray.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return daysArray;
  }

  function generateWeekDays(): Date[] {
    const weekDays: Date[] = [];
    for (let i = 0; i < 7; i++) {
      weekDays.push(addDays(weekStartDate, i));
    }
    return weekDays;
  }

  function formatDateRange(startDate: Date): string {
    const endDate = addDays(startDate, 6);
    const startMonth = startDate.toLocaleString('default', { month: 'long' });
    const endMonth = endDate.toLocaleString('default', { month: 'long' });
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const year = startDate.getFullYear();

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay}–${endDay}, ${year}`;
    } else {
      return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${year}`;
    }
  }

  function formatSingleDate(date: Date): string {
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  function isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  function isSelectedDate(date: Date): boolean {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  }

  useEffect(() => {
    if (
      selectedDate.getMonth() !== currentMonth.getMonth() ||
      selectedDate.getFullYear() !== currentMonth.getFullYear()
    ) {
      setCurrentMonth(new Date(selectedDate));
    }
  }, [selectedDate]);

  const weekDays = generateWeekDays();

  return (
    <CalendarDataProvider selectedDate={selectedDate}>
      {({ getEventsForDate }) => (
        <div className="flex h-screen overflow-hidden">
          <CalendarSidebar
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            showMonthSelector={showMonthSelector}
            setCurrentMonth={setCurrentMonth}
            setSelectedDate={setSelectedDate}
            toggleMonthSelector={toggleMonthSelector}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
            generateMonthDays={generateMonthDays}
            isToday={isToday}
            isSelectedDate={isSelectedDate}
            handleDateSelect={handleDateSelect}
          />

          <div className="flex-1 flex flex-col bg-white">
            <CalendarHeader
              calendarView={calendarView}
              selectedDate={selectedDate}
              weekStartDate={weekStartDate}
              setSelectedDate={setSelectedDate}
              setWeekStartDate={setWeekStartDate}
              setCalendarView={setCalendarView}
              handlePrevWeek={handlePrevWeek}
              handleNextWeek={handleNextWeek}
              handlePrevDay={handlePrevDay}
              handleNextDay={handleNextDay}
              formatDateRange={formatDateRange}
              formatSingleDate={formatSingleDate}
            />

            <CalendarGrid
              calendarView={calendarView}
              selectedDate={selectedDate}
              weekDays={weekDays}
              getEventsForDate={getEventsForDate}
              isToday={isToday}
              isSelectedDate={isSelectedDate}
              handleDateSelect={handleDateSelect}
              handleEventClick={handleEventClick}
            />
          </div>
          
          {/* Modal Component */}
          {selectedRequestId && (
            <ModalComponent 
              employeeId={selectedRequestId}
              // onClose={handleCloseModal}
            />
          )}
        </div>
      )}
    </CalendarDataProvider>
  );
};

export default AdminCalendar;
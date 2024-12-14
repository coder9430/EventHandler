import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    navigate(`/events/${formattedDate}`);
  };

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const renderCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = daysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();

    const grid = [];
    for (let i = 0; i < firstDay; i++) {
      grid.push(<div key={`empty-${i}`} className="border p-2"></div>);
    }

    for (let day = 1; day <= days; day++) {
      const date = new Date(year, month, day);
      grid.push(
        <div
          key={day}
          onClick={() => handleDateClick(date)}
          className="border p-2 cursor-pointer hover:bg-blue-200"
        >
          {day}
        </div>
      );
    }

    return grid;
  };

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleMonthChange(-1)}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous
        </button>
        <h1 className="text-lg font-bold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h1>
        <button
          onClick={() => handleMonthChange(1)}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </header>
      <div className="grid grid-cols-7 gap-2">{renderCalendarGrid()}</div>
    </div>
  );
};

export default CalendarPage;

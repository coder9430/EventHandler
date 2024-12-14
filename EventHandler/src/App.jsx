import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import CalendarPage from "./pages/CalendarPage";
import ListOfEvent from "./pages/ListOfEvent";

function App() {
  const [events, setEvents] = useState({});

  const handleUpdateEvents = (date, updatedEvents) => {
    setEvents((prev) => ({
      ...prev,
      [date]: updatedEvents,
    }));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route
          path="/events/:date"
          element={
            <ListOfEvent events={events} onUpdateEvents={handleUpdateEvents} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

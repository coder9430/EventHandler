import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ListOfEvent = () => {
  const { date } = useParams(); // Get the selected date from the URL
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem(date)) || [];
    setEvents(storedEvents);
  }, [date]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditEvent = () => {
    setEvents((prev) => [...prev, newEvent]);
    setNewEvent({ name: "", startTime: "", endTime: "", description: "" });
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  useEffect(() => {
    localStorage.setItem(date, JSON.stringify(events));
  }, [events, date]);

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/")}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back
        </button>
        <h1 className="text-lg font-bold">Events for {date}</h1>
      </header>
      <div className="mb-6">
        {events.length === 0 ? (
          <p>No events for this day.</p>
        ) : (
          events.map((event, index) => (
            <div
              key={index}
              className="p-4 mb-4 border rounded shadow hover:shadow-lg"
            >
              <h2 className="text-lg font-bold">{event.name}</h2>
              <p>
                {event.startTime} - {event.endTime}
              </p>
              <p>{event.description}</p>
              <button
                onClick={() => handleDeleteEvent(index)}
                className="p-2 bg-red-200 rounded hover:bg-red-300"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddOrEditEvent();
        }}
        className="p-4 border rounded"
      >
        <h2 className="text-lg font-bold mb-4">Add New Event</h2>
        <input
          type="text"
          name="name"
          value={newEvent.name}
          onChange={handleInputChange}
          placeholder="Event Name"
          className="mb-4 p-2 border w-full rounded"
          required
        />
        <input
          type="time"
          name="startTime"
          value={newEvent.startTime}
          onChange={handleInputChange}
          className="mb-4 p-2 border w-full rounded"
          required
        />
        <input
          type="time"
          name="endTime"
          value={newEvent.endTime}
          onChange={handleInputChange}
          className="mb-4 p-2 border w-full rounded"
          required
        />
        <textarea
          name="description"
          value={newEvent.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="mb-4 p-2 border w-full rounded"
        ></textarea>
        <button type="submit" className="p-2 bg-green-200 rounded hover:bg-green-300">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default ListOfEvent;




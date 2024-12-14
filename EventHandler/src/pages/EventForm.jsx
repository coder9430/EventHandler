import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const EventListPage = ({ selectedDate, events, onUpdateEvents, onBack }) => {
  const [isAddEventOpen, setAddEventOpen] = useState(false);

  const handleAddEvent = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newEvent = {
      name: formData.get("name"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      description: formData.get("description"),
    };

    const updatedEvents = [...events, newEvent];
    onUpdateEvents(updatedEvents);
    setAddEventOpen(false);
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Events on {selectedDate}</h1>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </header>

      {events.length === 0 ? (
        <p className="text-gray-500">No events for this date.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event, index) => (
            <Card key={index}>
              <CardContent>
                <p>
                  <strong>Event:</strong> {event.name}
                </p>
                <p>
                  <strong>Start Date:</strong> {event.startDate}
                </p>
                <p>
                  <strong>End Date:</strong> {event.endDate}
                </p>
                <p>
                  <strong>Description:</strong> {event.description || "N/A"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="fixed bottom-4 right-4">
        <Dialog open={isAddEventOpen} onOpenChange={setAddEventOpen}>
          <DialogTrigger asChild>
            <Button variant="primary">Add Event</Button>
          </DialogTrigger>
          <DialogContent>
            <h3 className="text-lg font-bold mb-2">Add Event</h3>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <Input
                name="name"
                placeholder="Event Name"
                required
              />
              <Input
                name="startDate"
                type="date"
                defaultValue={selectedDate}
                required
              />
              <Input
                name="endDate"
                type="date"
                required
              />
              <Textarea
                name="description"
                placeholder="Description"
              />
              <Button type="submit">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EventListPage;

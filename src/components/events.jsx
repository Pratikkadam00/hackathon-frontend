import React, { useEffect } from "react";
import { useEventsStore } from "../store/events.store";
import { NavLink } from "react-router-dom";

function Events() {
  const { events, fetchEvents } = useEventsStore();
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center">
        <span>Events</span>
        <NavLink
          to={"add-events"}
          className="px-4 py-1 flex items-center justify-center text-white text-sm bg-violet-500 rounded"
        >
          + Add
        </NavLink>
      </div>
      <div className=" p-2 flex flex-wrap">
        {events?.map((event, index) => (
          <EventCard event={event} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Events;

const EventCard = ({ event }) => {
  return (
    <div className="lg:w-1/4 text-sm relative bg-white flex flex-col shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="p-4">
        {/* Event Title */}
        <h2 className="font-bold text-gray-900 mb-2">{event.title}</h2>

        {/* Event Description */}
        <p className="text-gray-700 mb-4">{event.description}</p>

        {/* Attendees */}
        <div className="mb-4 text-xs">
          <h3 className=" font-semibold text-gray-800">Attendees:</h3>
          {event.attendees.length > 0 ? (
            <ul className="list-disc list-inside">
              {event.attendees.map((attendee, index) => (
                <li key={index} className="text-gray-600">
                  {attendee.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 italic">No attendees yet</p>
          )}
        </div>

        {/* Created By */}
        <div className="mb-4 text-xs">
          <h3 className="font-semibold text-gray-800">Created By:</h3>
          <p className="text-gray-600">{event.createdBy.name}</p>
        </div>

        {/* Notifications Status */}
        <div className="absolute top-1 text-[10px] right-1 flex items-center">
          <span
            className={`h-full px-3 rounded-l-md ${
              event.notificationsSent
                ? "text-green-600"
                : "text-red-600 bg-red-200"
            }`}
          >
            {event.notificationsSent ? "Sent" : "Not sent"}
          </span>
          <button className="px-2 text-white bg-violet-500 rounded-r-md">
            Send {event.notificationsSent ? "again ?" : "?"}
          </button>
        </div>

        {/* Created At */}
        <div className="text-xs">
          <h3 className="font-semibold text-gray-800">Created At:</h3>
          <p className="text-gray-600">
            {new Date(event.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

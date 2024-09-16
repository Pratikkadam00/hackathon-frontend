import React, { useEffect } from "react";
import { useEventsStore } from "../store/events.store";
import { NavLink } from "react-router-dom";

function Events() {
  const { events, fetchEvents } = useEventsStore();
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center">
      {Array.isArray(events) && events.length === 0 ? (
        // When no events are present, show welcome message

        <div className="text-center">
          <div className="bg-white p-10 rounded-xl shadow-md shadow-blue-200  transition-transform transform hover:scale-105 duration-300 ease-in-out">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 italic animate-fadeIn">
              Welcome to Evento!
            </h1>
            <p className="text-gray-600 mb-6 font-semibold animate-fadeIn delay-100">
              It looks like you haven't created any events yet. Let's get
              started by adding your first event.
            </p>
            <NavLink
              to={"add-events"}
              className="px-6 py-3 inline-flex items-center justify-center text-white text-sm bg-violet-500 shadow-xl rounded-lg hover:bg-violet-600 transition duration-300 ease-in-out transform hover:translate-y-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="font-bold">Add Event</span>
            </NavLink>
          </div>
        </div>
      ) : (
        // When events are present, show event list
        <div className="w-full h-full">
          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold text-lg">Upcoming Events...</span>
            <NavLink
              to={"add-events"}
              className="px-6 py-3 flex items-center justify-center text-white text-sm bg-violet-500 shadow-xl rounded-lg hover:bg-violet-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="font-bold">Add Event</span>
            </NavLink>
          </div>
          <div className="p-2 flex flex-wrap">
            {Array.isArray(events) &&
              events.map((event, index) => (
                <EventCard event={event} key={index} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;

const EventCard = ({ event }) => {
  return (
    <div className="lg:w-1/4 mx-5 my-5 text-sm relative bg-white flex flex-col shadow-xl rounded-lg overflow-hidden border border-gray-200">
      <div className="p-4">
        {/* Event Title */}
        <h2 className="font-bold text-gray-900 mb-2">{event.title}</h2>

        {/* Event Description */}
        <p className="text-gray-700 mb-4">{event.description}</p>

        {/* Attendees */}
        <div className="mb-4 text-xs">
          <h3 className="font-semibold text-gray-800">Attendees:</h3>
          {event.attendees.length > 0 ? (
            <ul className="list-disc list-inside">
              {event.attendees.map((attendee, index) => (
                <li key={index} className="text-gray-600">
                  {attendee.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">0 Attendees</p>
          )}
        </div>

        {/* Created By */}
        <div className="mb-4 text-xs">
          <h3 className="font-semibold text-gray-800">Created By:</h3>
          <p className="text-gray-600 first-letter:capitalize">
            {event.createdBy.name}
          </p>
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
            Send {event.notificationsSent ? "again?" : "?"}
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

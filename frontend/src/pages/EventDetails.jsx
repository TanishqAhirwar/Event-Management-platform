import { Link, useParams } from "react-router-dom";
import { upcomingEvents, availableEvents, ongoingEvents } from "../utils/eventsdata";

// Combine all events into one array
const allEvents = [...ongoingEvents, ...availableEvents, ...upcomingEvents];

export default function EventDetails() {
  const { id } = useParams();
  const event = allEvents.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl text-red-500 font-bold">Event not found.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full max-h-[650px] object-cover rounded-xl shadow"
          />
          <div>
            <h1 className="text-4xl font-bold text-green-400 mb-4">
              {event.title}
            </h1>
            <p className="text-gray-300 mb-2">
              📅 {event.date} at {event.time}
            </p>
            <p className="text-gray-300 mb-2">📍 {event.location}</p>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {event.description}
            </p>

            {event.availableSlots !== undefined && (
              <div className="bg-white text-black p-4 rounded-lg shadow mb-4">
                <p className="font-semibold">Available Slots: {event.availableSlots}</p>
                <p className="font-semibold">Price: {event.price}</p>
              </div>
            )}

            <Link
              to={`/book-ticket/${event.id}`}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition font-semibold"
            >
              Book Ticket
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

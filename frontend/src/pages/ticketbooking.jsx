import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { upcomingEvents, ongoingEvents, availableEvents } from "../utils/eventsdata";

// Merge all event arrays into one
const allEvents = [...upcomingEvents, ...ongoingEvents, ...availableEvents];

export default function TicketBooking() {
  const { id } = useParams(); // get event ID from URL
  const event = allEvents.find((e) => e.id === parseInt(id));
  console.log("Event ID from URL:", id);
  console.log("Fetched event:", event);

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl font-semibold">
        Event not found. 😢
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
          Book Your Ticket
        </h1>

        <div className="bg-white text-black p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            Book Ticket for: {event.title}
          </h2>
          <p className="text-black mb-2">
            📅 {event.date} at {event.time}
          </p>
          <p className="text-black mb-4">📍 {event.location}</p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-1 font-semibold">
                Number of Tickets
              </label>
              <input
                type="number"
                min={1}
                max={5}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none"
                placeholder="1"
              />
            </div>

            {/* <div className="md:col-span-2">
              <label className="block mb-1 font-semibold">
                Additional Notes
              </label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border focus:outline-none"
                rows={3}
                placeholder="Any special requirements..."
              ></textarea>
            </div> */}

            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import EventCard from "./EventCard";
import { upcomingEvents, availableEvents, ongoingEvents } from "../utils/eventsdata";
import { Link } from "react-router-dom";

export default function EventsGrid({ showAll }) {
  return (
    <div className="py-10 bg-white px-4 text-black">
      {/* Upcoming Events */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-green-400 text-center mb-8">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-14">
            <Link
              to="/events"
              className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              View More Events
            </Link>
          </div>
        )}
      </section>

      {/* Only render below sections if showAll is true */}
      {showAll && (
        <>
          {/* Available Events */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-yellow-400 text-center mb-8">
              Available Events (Book Now)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {availableEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>

          {/* Ongoing Events */}
          <section>
            <h2 className="text-3xl font-bold text-red-400 text-center mb-8">
              Ongoing Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {ongoingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

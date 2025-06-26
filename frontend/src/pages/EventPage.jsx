 
import EventCard from "../components/EventCard"; // adjust path if needed
 
import {
  upcomingEvents,
  ongoingEvents,
  availableEvents,
} from "../utils/eventsdata";
 

export default function EventsPage() {
  return (
    <>
     
      <div className="min-h-screen text-black px-6 py-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="md:w-1/5 space-y-6  mt-10">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-green-400">
                Filter by Category
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <input type="checkbox" /> Music
                </li>
                <li>
                  <input type="checkbox" /> Technology
                </li>
                <li>
                  <input type="checkbox" /> Art
                </li>
                <li>
                  <input type="checkbox" /> Business
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-green-400">
                Filter by City
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <input type="checkbox" /> Delhi
                </li>
                <li>
                  <input type="checkbox" /> Mumbai
                </li>
                <li>
                  <input type="checkbox" /> Banglore
                </li>
                <li>
                  <input type="checkbox" /> Pune
                </li>
              </ul>
            </div>
          </aside>

          {/* Events Listing */}
          <main className="md:w-3/4">
            {/* <h1 className="text-3xl font-bold mb-6 text-green-400 flex justify-center">
              Explore All Events
            </h1> */}

            <section className="mb-8 ">
              <h2 className="text-2xl font-semibold text-white mb-4 text-center">
                Ongoing Events
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {ongoingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 text-center">
                Available for Booking
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {availableEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 text-center">
                Upcoming Events
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

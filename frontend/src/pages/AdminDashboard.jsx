import { useState } from "react";

const dummyEvents = [
  {
    id: 1,
    title: "Tech Expo 2025",
    date: "2025-07-15",
    location: "Bangalore",
    attendees: 120,
    seats: 150, 
  },
  {
    id: 2,
    title: "Health & Wellness Fair",
    date: "2025-08-10",
    location: "Mumbai",
    attendees: 85,
    seats: 100,
  },
  {
    id: 3,
    title: "Startup Connect",
    date: "2025-09-05",
    location: "Delhi",
    attendees: 200,
    seats: 220,
  },
];

export default function AdminDashboard() {
  const [events, setEvents] = useState(dummyEvents);

  const handleDelete = (id) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
  };

  return (
    <>
   
    <div className="min-h-screen bg-black p-6 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-400">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white text-black rounded-lg shadow p-5 text-center">
          <p className="text-gray-500">Total Events</p>
          <p className="text-3xl font-bold text-green-600">{events.length}</p>
        </div>
        <div className="bg-white text-black rounded-lg shadow p-5 text-center">
          <p className="text-gray-500">Total Attendees</p>
          <p className="text-3xl font-bold text-green-600">
            {events.reduce((acc, e) => acc + e.attendees, 0)}
          </p>
        </div>
        <div className="bg-white text-black rounded-lg shadow p-5 text-center">
          <p className="text-gray-500">Total Seats</p>
          <p className="text-3xl font-bold text-green-600">
            {events.reduce((acc, e) => acc + e.seats, 0)}
          </p>
        </div>
      </div>

      {/* Event Table */}
      <div className="bg-white p-6 rounded-lg shadow text-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Manage Events</h2>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            + Create Event
          </button>
        </div>
        <table className="w-full table-auto">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Date</th>
              <th className="p-3">Location</th>
              <th className="p-3">Attendees</th>
              <th className="p-3">Seats</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b border-gray-300">
                <td className="p-3">{event.title}</td>
                <td className="p-3">{event.date}</td>
                <td className="p-3">{event.location}</td>
                <td className="p-3">{event.attendees}</td>
                <td className="p-3">{event.seats}</td>
                <td className="p-3 space-x-2">
                  <button className="text-green-600 hover:underline">Edit</button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

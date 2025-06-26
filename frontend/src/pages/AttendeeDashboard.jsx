import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";

const attendeeBookings = [
  {
    id: 1,
    title: "Tech Conference 2025",
    date: "2025-05-12",
    time: "10:00 AM",
    location: "Bangalore",
    status: "Confirmed",
    image: "/images/tech.jpg",
  },
  {
    id: 2,
    title: "Art & Culture Fest",
    date: "2025-06-01",
    time: "3:00 PM",
    location: "Mumbai",
    status: "Cancelled",
    image: "/images/art.jpg",
  },
  {
    id: 3,
    title: "Startup Pitch Day",
    date: "2025-06-20",
    time: "12:00 PM",
    location: "Delhi",
    status: "Confirmed",
    image: "/images/startup.jpg",
  },
];

export default function AttendeeDashboard() {
  const [search, setSearch] = useState("");

  const filteredBookings = attendeeBookings.filter((booking) =>
    booking.title.toLowerCase().includes(search.toLowerCase())
  );

  const total = attendeeBookings.length;
  const confirmed = attendeeBookings.filter(
    (b) => b.status === "Confirmed"
  ).length;
  const cancelled = attendeeBookings.filter(
    (b) => b.status === "Cancelled"
  ).length;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    navigate('/login');
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white px-4 py-10">
        <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
          My Bookings Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
          <div className="bg-white text-black p-5 rounded-xl shadow">
            <h4 className="text-lg font-semibold">Total Bookings</h4>
            <p className="text-3xl font-bold text-green-500">{total}</p>
          </div>
          <div className="bg-white text-black p-5 rounded-xl shadow">
            <h4 className="text-lg font-semibold">Confirmed</h4>
            <p className="text-3xl font-bold text-green-500">{confirmed}</p>
          </div>
          <div className="bg-white text-black p-5 rounded-xl shadow">
            <h4 className="text-lg font-semibold">Cancelled</h4>
            <p className="text-3xl font-bold text-red-500">{cancelled}</p>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white text-black outline-none"
          />
        </div>

        {/* Booking Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredBookings.length === 0 ? (
            <p className="text-center text-gray-400 col-span-full">
              No bookings found.
            </p>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white text-black rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={booking.image}
                  alt={booking.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-1">{booking.title}</h3>
                  <p className="text-sm text-gray-700 mb-1">
                    📅 {booking.date} at {booking.time}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    📍 {booking.location}
                  </p>

                  <p
                    className={`text-sm font-semibold mb-4 ${
                      booking.status === "Confirmed"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Status: {booking.status}
                  </p>

                  {booking.status !== "Cancelled" && (
                    <button
                      onClick={() => alert("Booking Cancelled")}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      )
    </>
  );
}

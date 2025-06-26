import { FaMapMarkerAlt, FaEnvelope, FaSignOutAlt, FaEdit, FaCalendarAlt } from "react-icons/fa";

export default function UserProfile() {
  // Dummy user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    location: "New York, USA",
    avatar: "/images/user-avatar.png", // Ensure this image exists in public/images
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 py-6 shadow-md px-6 md:px-20">
        <h1 className="text-3xl font-bold text-green-400">My Profile</h1>
      </div>

      {/* Profile Section */}
      <div className="flex-grow px-4 md:px-20 py-10 flex flex-col lg:flex-row gap-10">
        {/* Left: User Info */}
        <div className="bg-gray-900 w-full lg:w-1/3 rounded-2xl p-6 shadow-lg text-center">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-green-400 object-cover mx-auto mb-4"
            loading="lazy"
          />
          <h2 className="text-2xl font-bold text-green-400">{user.name}</h2>
          <p className="text-gray-300 flex items-center justify-center gap-2 mt-2">
            <FaEnvelope className="text-green-400" /> {user.email}
          </p>
          <p className="text-gray-300 flex items-center justify-center gap-2 mt-1">
            <FaMapMarkerAlt className="text-green-400" /> {user.location}
          </p>
          <div className="mt-6 flex flex-col gap-4">
            <button className="flex items-center justify-center gap-2 bg-green-400 text-black px-4 py-2 rounded hover:bg-white hover:text-green-600 transition">
              <FaEdit /> Edit Profile
            </button>
            <button className="flex items-center justify-center gap-2 border border-green-400 px-4 py-2 rounded text-green-400 hover:bg-green-400 hover:text-black transition">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Right: My Bookings */}
        <div className="flex-grow">
          <h3 className="text-2xl font-semibold text-green-400 mb-6">My Bookings</h3>
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-green-400 transition">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white">Music Fest 2025</h4>
                  <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                    <FaCalendarAlt className="text-green-400" /> May 20, 2025
                  </p>
                </div>
                <p className="text-green-400 font-semibold">Confirmed</p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-yellow-400 transition">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white">React Workshop</h4>
                  <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                    <FaCalendarAlt className="text-green-400" /> June 1, 2025
                  </p>
                </div>
                <p className="text-yellow-400 font-semibold">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

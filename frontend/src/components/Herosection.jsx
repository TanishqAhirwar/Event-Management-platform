// HeroSection.jsx

export default function HeroSection() {
  return (
    <div className=" h-screen  text-white flex flex-col">
      {/* Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#00FF88]">
          Your gateway to experiences <br />
          that inspire and connect.
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          Join thousands of people connecting through exciting events,
          workshops, concerts & more!
        </p>

        {/* Search bar */}
        <div className="w-full max-w-2xl relative">
          <input
            type="text"
            placeholder="Search for events, cities, or categories..."
            className="w-full px-6 py-3 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00FF88] bg-white text-black"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#00FF88] text-black px-4 py-2 rounded-full hover:bg-green-400 transition">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

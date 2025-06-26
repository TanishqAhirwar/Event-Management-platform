export default function Eventbylocation() {
  return (
    <>
      <section className="bg-white text-white py-10 my-5 ">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">
            Browse Events by City
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
            {[
              "Delhi",
              "Mumbai",
              "Bangalore",
              "Pune",
              "Hyderabad",
              "Chennai",
            ].map((city) => (
              <div
                key={city}
                className="bg-green-600 hover:bg-green-500 transition rounded-lg p-4 text-lg font-semibold cursor-pointer"
              >
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

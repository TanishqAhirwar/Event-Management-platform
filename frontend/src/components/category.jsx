const categoriesData = [
  {
    id: 1,
    name: "Music",
    image: "/images/concert.jpg",
    emoji: "🎵",
  },
  {
    id: 2,
    name: "Technology",
    image: "/images/techconference.jpg",
    emoji: "💻",
  },
  {
    id: 3,
    name: "Art & Culture",
    image: "/images/art.jpg",
    emoji: "🎨",
  },
  {
    id: 4,
    name: "Fitness",
    image: "/images/fitness.jpg",
    emoji: "💪",
  },
  {
    id: 5,
    name: "Business",
    image: "/images/business.jpg",
    emoji: "📈",
  },
  {
    id: 6,
    name: "Food & Drink",
    image: "/images/food.jpg",
    emoji: "🍕",
  },
];

export default function Category() {
  return (
    <div className="mt-12 px-4">
      <h2 className="text-3xl font-bold text-center text-green-500 mb-8">
        Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categoriesData.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-400 ease-in-out hover:scale-105"
          >
            {/* Image on Top */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-52 object-cover"
              loading="lazy"
            />

            {/* Content */}
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {category.emoji} {category.name}
              </h3>
              <p className="text-sm text-gray-600">
                Explore top {category.name} events.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

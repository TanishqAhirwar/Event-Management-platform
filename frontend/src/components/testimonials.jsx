 

const testimonialsData = [
  {
    name: "Aarav Mehta",
    role: "Tech Conference Speaker",
    image: "/images/aaravmehta.jpg",
    quote:
      "EventHive gave me the perfect platform to reach a wider audience. Everything was seamless—from registration to feedback!",
  },
  {
    name: "Isha Kapoor",
    role: "Music Festival Attendee",
    image: "/images/ishakapoor.jpg",
    quote:
      "I found amazing concerts I wouldn’t have known about otherwise. Love how easy it is to book and explore events!",
  },
  {
    name: "Rohan Das",
    role: "Art Expo Organizer",
    image: "/images/Rohandas.jpg",
    quote:
      "EventHive made it simple to create and promote our event. The dashboard is intuitive, and support is great!",
  },
];

export default function Testimonials() {
  return (
    <div className="bg-white py-16 px-4 my-5">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-12">
        What People Say About Us
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition duration-300"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 mx-auto rounded-full mb-4 object-cover"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{testimonial.role}</p>
            <p className="text-gray-700 text-sm italic">“{testimonial.quote}”</p>
          </div>
        ))}
      </div>
    </div>
  );
}

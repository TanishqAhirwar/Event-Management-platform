import React from "react";

const galleryImages = [
  "/gallery/birthdayparty2.jpg",
  "/gallery/decor.jpg",
  "/gallery/musicmania2.jpg",
  "/gallery/networking.jpg",
  "/gallery/tastyfood.jpg",
  "/gallery/workshop.jpg",
];

export default function GallerySection() {
  return (
    <div className="mt-16 px-4">
      <h2 className="text-3xl font-bold text-center text-green-500 mb-8">
        Our Gallery
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl shadow-lg group"
          >
            <img
              src={img}
              alt={`Event ${index + 1}`}
              className="w-full h-[22rem] object-cover transform group-hover:scale-105 transition duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

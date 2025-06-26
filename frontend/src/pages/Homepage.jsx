import Category from "../components/category";
import Eventbylocation from "../components/eventbylocation";
import EventsGrid from "../components/Eventgrid";
import GallerySection from "../components/Gallerysection";
import Testimonials from "../components/testimonials";

export default function Homepage() {
  return (
    <>
      <EventsGrid showAll={false} />
      <Category />
      <Eventbylocation />
      <GallerySection />
      <Testimonials />
    </>
  );
}

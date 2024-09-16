
import placeholder from "@/assets/placeholder.png";
import AccommodationItem from "./accomodation-item";
export default function Component() {
  const adventures = [
    {
      title: "Majestic Mountain Adventures",
      price: 83.74,
      rating: 4.2,
      location: "United States",
      dates: "14 - 15 Sep 2024",
      booked: 12,
      mainImage: placeholder.src,
      subImage1: placeholder.src,
      subImage2: placeholder.src,
    },
    {
      title: "Majestic Mountain Adventures",
      price: 83.74,
      rating: 4.2,
      location: "United States",
      dates: "14 - 15 Sep 2024",
      booked: 12,
      mainImage: placeholder.src,
      subImage1: placeholder.src,
      subImage2: placeholder.src,
    },
    {
      title: "Majestic Mountain Adventures",
      price: 83.74,
      rating: 4.2,
      location: "United States",
      dates: "14 - 15 Sep 2024",
      booked: 12,
      mainImage: placeholder.src,
      subImage1: placeholder.src,
      subImage2: placeholder.src,
    },
    {
      title: "Majestic Mountain Adventures",
      price: 83.74,
      rating: 4.2,
      location: "United States",
      dates: "14 - 15 Sep 2024",
      booked: 12,
      mainImage: placeholder.src,
      subImage1: placeholder.src,
      subImage2: placeholder.src,
    },
    // Add more adventure objects here for additional cards
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adventures.map((adventure, index) => (
          <AccommodationItem details={adventure} key={index} />
        ))}
      </div>
    </div>
  );
}

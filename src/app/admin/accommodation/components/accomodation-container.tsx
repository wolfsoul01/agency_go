import AccommodationItem from "./accomodation-item";
import { Room } from "@/interfaces/server-interface";

interface Props {
  rooms: Room[];
}

export default function RoomView({ rooms }: Props) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms?.map((room) => (
          <AccommodationItem room={room} key={room.id} />
        ))}
      </div>
    </div>
  );
}

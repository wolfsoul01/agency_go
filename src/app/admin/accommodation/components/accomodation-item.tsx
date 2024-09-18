/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, StarIcon, UsersIcon } from "lucide-react";
import placeholder from "@/assets/placeholder.png";
import { Room } from "@/interfaces/server-interface";
import { Button } from "@/components/ui/button";

interface Props {
  room: Room;
}

export default function AccommodationItem(props: Props) {
  const { room } = props;

  const { Image, totalPersons, name, pricePerNight, description } = room;

  const handleNavigation = () => {
    window.location.href = `accommodation/${room.id}`;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={Image?.url ?? placeholder.src}
            alt={name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 left-2 bg-white/80 text-black backdrop-blur-sm rounded-full px-2 py-1 text-sm font-semibold">
            ${pricePerNight}
          </div>
          <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-sm font-semibold flex items-center">
            <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-black">{0}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-2">{name}</CardTitle>
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <MapPinIcon className="w-4 h-4 mr-1" />
          {description}
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <CalendarIcon className="w-4 h-4 mr-1" />
          {description}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          <UsersIcon className="w-4 h-4 mr-1" />
          {totalPersons} Capacidad
        </div>
        <Button variant={"link"} size={"sm"} onClick={handleNavigation}>
          <Badge variant="secondary">Detalles</Badge>
        </Button>
      </CardFooter>
    </Card>
  );
}

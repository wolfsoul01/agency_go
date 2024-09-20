import { Card, CardContent } from "@/components/ui/card";
import { Room } from "@/interfaces/server-interface";
import { formatCurrency } from "@/lib/utils";
import React from "react";
import defaultImage from "@/assets/placeholder.png";
import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";

interface Props {
  room: Room;
  handleSelect: (roomId?: number) => void;
}
function RoomCard({ room: item, handleSelect }: Props) {
  return (
    <Card key={item.id}>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            src={item?.Image?.url ?? defaultImage.src}
            alt="Imagen del alojamiento"
            className="rounded-lg object-cover w-full sm:w-1/3"
          />
          <div className="flex-1 flex flex-col justify-between ">
            <div>
              <h3 className="text-2xl font-semibold mb-2">{item.name}</h3>
              <span className=" font-semibold mb-2 flex items-center gap-x-2">
                <User2 className="size-5" />
                Capacidad :{item.totalPersons}
              </span>
              <span className="text-xl font-semibold my-3">Descripción :</span>
              <p className="text-muted-foreground mb-4">{item.description}</p>
            </div>
            <div className="flex justify-between  items-end">
              <div>
                <div className="flex items-center">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    4.0 (250 reseñas)
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Precio por noche desde
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(item.pricePerNight)}
                </p>
                <Button className="mt-2" onClick={() => handleSelect(item.id)}>
                  Reservar ahora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RoomCard;

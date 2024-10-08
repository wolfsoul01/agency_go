import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Fuel, Gauge, Calendar, Zap } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Card as Car } from "@/interfaces/server-interface";
import img from "@/assets/placeholder.png";

interface Props {
  car: Car;
  handleSelect: (carId: number) => void;
}

export default function CarCard({ car, handleSelect }: Props) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square object-cover w-full ">
        <img
          src={car?.image?.url ?? img.src}
          alt={`${car.make} ${car.model}`}
          //layout="fill"
          //objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <h3 className="text-2xl font-bold text-white">
              {car.make} {car.model}
            </h3>
            <p className="text-sm text-white/80">{car?.year}</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {/* {car?.status} */}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Fuel className="w-5 h-5 mr-2 text-primary" />
            <div>
              <p className="text-sm font-medium">{car?.tank} L</p>
              <p className="text-xs text-muted-foreground">Combustible</p>
            </div>
          </div>
          <div className="flex items-center">
            <Gauge className="w-5 h-5 mr-2 text-primary" />
            <div>
              <p className="text-sm font-medium">{car?.km} km</p>
              <p className="text-xs text-muted-foreground">Kilometraje</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            <div>
              <p className="text-sm font-medium">{car.year}</p>
              <p className="text-xs text-muted-foreground">Año</p>
            </div>
          </div>
          <div className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-primary" />
            <div>
              <p className="text-sm font-medium">{car?.acceleration} s</p>
              <p className="text-xs text-muted-foreground">0-100 km/h</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 bg-secondary">
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-2xl font-bold">
              {formatCurrency(car?.priceForDay)}
            </p>
            <p className="text-sm text-muted-foreground">por día</p>
          </div>
          <Button onClick={() => handleSelect(car.id as number)}>
            Reservar ahora
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

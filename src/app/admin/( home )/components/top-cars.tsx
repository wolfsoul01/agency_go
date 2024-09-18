import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { TrendingUp } from "lucide-react";

export default function TopCars() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex gap-x-2 items-center">
          Mas populares
          <TrendingUp />
        </CardTitle>
        <CardDescription>Top 5 autos mas populares</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {[
            "Tesla Model 3",
            "Toyota Camry",
            "Honda Civic",
            "Ford Mustang",
            "BMW 3 Series",
          ].map((car, index) => (
            <div className="flex items-center border-b hover:opacity-70 cursor-default" key={car}>
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={`/placeholder.svg?height=36&width=36`}
                  alt={car}
                />
                <AvatarFallback>{car[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{car}</p>
                <p className="text-sm text-muted-foreground">
                  {85 - index * 12} renta
                </p>
              </div>
              <div className="ml-auto font-medium">
                +{(18 - index * 2).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

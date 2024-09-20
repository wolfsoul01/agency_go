"use client";
import { CalendarIcon, CarIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DatePicker } from "@/components/shared/date-picker";
import { useCars } from "./hooks/useGetCars";
import { useRooms } from "./hooks/useGetRooms";
import { useState } from "react";
import RoomCard from "./components/roo-card";
import CarCard from "./components/car-card";

enum Tab {
  CARS = "cars",
  ROOMS = "rooms",
}

export default function ReservaPage() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { data: cars } = useCars(startDate, endDate);
  const { data: rooms } = useRooms(startDate, endDate);

  const [tab, setTab] = useState<string>(Tab.ROOMS);

  return (
    <div className="container mx-auto px-4 py-4">
      <Tabs defaultValue={Tab.ROOMS} className="w-full" onValueChange={setTab}>
        <Card className="mb-8 ">
          <CardContent className="p-6">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value={Tab.ROOMS}>Alojamiento</TabsTrigger>
              <TabsTrigger value={Tab.CARS}>Autos</TabsTrigger>
            </TabsList>
            <TabsContent value={Tab.ROOMS}>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="text-muted-foreground" />
                  <DatePicker />
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="text-muted-foreground" />
                  <DatePicker />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Huéspedes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 huésped</SelectItem>
                    <SelectItem value="2">2 huéspedes</SelectItem>
                    <SelectItem value="3">3 huéspedes</SelectItem>
                    <SelectItem value="4">4+ huéspedes</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full sm:w-auto">
                  <SearchIcon className="mr-2 h-4 w-4" /> Buscar
                </Button>
              </div>
            </TabsContent>
            <TabsContent value={Tab.CARS}>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="text-muted-foreground" />
                  <DatePicker />
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="text-muted-foreground" />
                  <DatePicker />
                </div>
                <Button className="w-full sm:w-auto">
                  <SearchIcon className="mr-2 h-4 w-4" /> Buscar Autos
                </Button>
              </div>
            </TabsContent>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 bg-background/80  z-40"></div>
          <Card className="md:col-span-1 fixed max-w-72 z-50">
            <div className="">

            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="price-range">Rango de Precio</Label>
                  {/* <Slider
                  id="price-range"
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={10}
                  className="mt-2"
                /> */}
                </div>
                <div>
                  <Label htmlFor="rating">Calificación mínima</Label>
                  <Select>
                    <SelectTrigger id="rating">
                      <SelectValue placeholder="Seleccionar calificación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 estrellas</SelectItem>
                      <SelectItem value="4">4 estrellas</SelectItem>
                      <SelectItem value="5">5 estrellas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Servicios</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button variant="outline" className="justify-start">
                      <CarIcon className="mr-2 h-4 w-4" /> Estacionamiento
                    </Button>
                    <Button variant="outline" className="justify-start">
                      WiFi
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Piscina
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Gimnasio
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            </div>

          </Card>
          {tab === Tab.ROOMS && (
            <div className="md:col-span-3 space-y-6">
              {tab === Tab.ROOMS &&
                rooms.map((item) => <RoomCard room={item} key={item.id} />)}
            </div>
          )}
          {
            <div className="md:col-span-3 space-y-6">
              {tab === Tab.CARS &&
                cars.map((item) => <CarCard car={item} key={item.id} />)}
            </div>
          }
        </div>
      </Tabs>
    </div>
  );
}

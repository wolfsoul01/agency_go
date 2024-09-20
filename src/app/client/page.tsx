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
import { useForm } from "react-hook-form";
import CarCardSkeleton from "./components/car-card-skeleton";
import RoomCardSkeleton from "./components/room-card-skeleton";
import { addDays } from "date-fns";
import { Card as Car, Room } from "@/interfaces/server-interface";
import Modal from "@/components/shared/modal";
import RoomReservationForm from "./components/form/room-reservation-form";
import CarReservationForm from "./components/form/car-reservation-form";

enum Tab {
  CARS = "cars",
  ROOMS = "rooms",
}

export default function ReservaPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    addDays(new Date(), 1)
  );

  const handleChangeStartDate = (date?: Date) => {
    setStartDate(date);
  };
  const handleChangeEndDate = (date?: Date) => {
    setEndDate(date);
  };

  const { data: cars, isFetching: isFetchingCars } = useCars(
    startDate,
    endDate
  );
  const { data: rooms, isFetching: isFetchingRoom } = useRooms(
    startDate,
    endDate
  );

  const [tab, setTab] = useState<string>(Tab.ROOMS);

  const form = useForm();
  const { control, watch, handleSubmit } = form;

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleSelectRoom = (value?: number) => {
    const room = rooms?.find((room) => room.id === value);
    setSelectedRoom(room || null);
    setShowModal(true);
  };
  const handleSelectCard = (value?: number) => {
    const car = cars?.find((car) => car.id === value);
    setSelectedCar(car || null);
    setShowModal2(true);
  };

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
                  <DatePicker
                    minDate={new Date()}
                    onChange={handleChangeStartDate}
                    defaultDate={startDate}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="text-muted-foreground" />
                  <DatePicker
                    minDate={addDays(new Date(), 1)}
                    onChange={handleChangeEndDate}
                    defaultDate={endDate}
                  />
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
                  <DatePicker
                    minDate={new Date()}
                    onChange={handleChangeStartDate}
                    defaultDate={startDate}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="text-muted-foreground" />
                  <DatePicker
                    minDate={addDays(new Date(), 1)}
                    onChange={handleChangeEndDate}
                    defaultDate={endDate}
                  />
                </div>
                <Button className="w-full sm:w-auto">
                  <SearchIcon className="mr-2 h-4 w-4" /> Buscar Autos
                </Button>
              </div>
            </TabsContent>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1 ">
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
              {isFetchingRoom
                ? Array.from({ length: 10 }).map((key, idx) => (
                    <RoomCardSkeleton key={idx} />
                  ))
                : rooms.map((item) => (
                    <RoomCard
                      room={item}
                      key={item.id}
                      handleSelect={handleSelectRoom}
                    />
                  ))}
            </div>
          )}
          {tab === Tab.CARS && (
            <div className="md:col-span-3 space-y-6">
              {isFetchingRoom
                ? Array.from({ length: 10 }).map((key, idx) => (
                    <CarCardSkeleton key={idx} />
                  ))
                : cars.map((item) => (
                    <CarCard
                      car={item}
                      key={item.id}
                      handleSelect={handleSelectCard}
                    />
                  ))}
            </div>
          )}
        </div>
      </Tabs>

      <Modal open={showModal} close={() => setShowModal(false)} size="3xl">
        <RoomReservationForm
          endDate={endDate as Date}
          starDate={startDate as Date}
          room={selectedRoom as Room}
        />
      </Modal>
      <Modal open={showModal2} close={() => setShowModal2(false)} size="3xl">
        <CarReservationForm
          endDate={endDate as Date}
          startDate={startDate as Date}
          car={selectedCar as Car}
        />
      </Modal>
    </div>
  );
}

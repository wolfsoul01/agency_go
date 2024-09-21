"use client";
import {
  CalendarIcon,
  SearchIcon,
  SearchSlash,
  SearchSlashIcon,
} from "lucide-react";
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
import { useEffect, useState } from "react";
import RoomCard from "./components/roo-card";
import CarCard from "./components/car-card";
import CarCardSkeleton from "./components/car-card-skeleton";
import RoomCardSkeleton from "./components/room-card-skeleton";
import { addDays, endOfDay, isBefore, isSameDay, startOfDay } from "date-fns";
import { Card as Car, Room } from "@/interfaces/server-interface";
import Modal from "@/components/shared/modal";
import RoomReservationForm from "./components/form/room-reservation-form";
import CarReservationForm from "./components/form/car-reservation-form";
import { Input } from "@/components/ui/input";

enum Tab {
  CARS = "cars",
  ROOMS = "rooms",
}

export default function ReservaPage() {

  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    addDays(new Date(), 1)
  );

  //Filters states
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [totalPersons, setTotalPersones] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (startDate && endDate) {
      const isBeforeSelect =
        isBefore(endOfDay(endDate), startOfDay(startDate)) ||
        isSameDay(endOfDay(endDate), startOfDay(startDate));

      if (isBeforeSelect) {
        setEndDate(addDays(startDate, 1));
      }
    }
  }, [startDate]);

  const handleChangeStartDate = (date?: Date) => {
    setStartDate(date);
  };
  const handleChangeEndDate = (date?: Date) => {
    setEndDate(date);
  };

  const {
    data: cars,
   // isFetching: isFetchingCars,
    refetch: refetchCar,
  } = useCars(startDate, endDate,price);
  const {
    data: rooms,
    isFetching: isFetchingRoom,
    refetch: refetchRoom,
  } = useRooms(startDate, endDate, price, totalPersons);

  const [tab, setTab] = useState<string>(Tab.ROOMS);

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

  const callback = () => {
    setShowModal(false);
    setShowModal2(false);
    tab === Tab.ROOMS ? refetchRoom() : refetchCar();
  };

  const handleRefresh = () => {
    tab === Tab.ROOMS ? refetchRoom() : refetchCar();
  };

  const clearFilter = () => {
    setPrice(undefined);
    setTotalPersones(undefined);
    handleRefresh();
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
                    externalSate={endDate}
                  />
                </div>
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
                    externalSate={endDate}
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
                    <Input
                      type="number"
                      id="price-range"
                      onChange={(value) => setPrice(+value.target.value)}
                      value={price}
                    />
                  </div>
                  {/* <div>
                    <Label htmlFor="rating" className="mb-2">
                      Calificación mínima
                    </Label>
                    <Select onValueChange={(value: string) => setRate(+value)}>
                      <SelectTrigger id="rating">
                        <SelectValue placeholder="Seleccionar calificación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 estrellas</SelectItem>
                        <SelectItem value="4">4 estrellas</SelectItem>
                        <SelectItem value="5">5 estrellas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div> */}
                  {tab === Tab.ROOMS && (
                    <div>
                      <Label htmlFor="rating" className="mb-2">
                        Capacidad
                      </Label>
                      <Select
                        onValueChange={(value) => setTotalPersones(+value)}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Huéspedes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 huésped</SelectItem>
                          <SelectItem value="2">2 huéspedes</SelectItem>
                          <SelectItem value="3">3 huéspedes</SelectItem>
                          <SelectItem value="4">4+ huéspedes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div>
                    <footer className="w-full flex gap-x-4">
                      <Button
                        className="w-full sm:w-auto"
                        onClick={clearFilter}
                        variant={"destructive"}
                      >
                        <SearchSlashIcon className="mr-2 h-4 w-4" /> Limpiar
                      </Button>
                      <Button
                        className="w-full sm:w-auto"
                        onClick={() => handleRefresh()}
                      >
                        <SearchIcon className="mr-2 h-4 w-4" /> Buscar {"    "}
                      </Button>
                    </footer>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
          {tab === Tab.ROOMS && (
            <div className="md:col-span-3 space-y-6">
              {isFetchingRoom ? (
                Array.from({ length: 10 }).map((key, idx) => (
                  <RoomCardSkeleton key={idx} />
                ))
              ) : rooms.length === 0 ? (
                <NotResult />
              ) : (
                rooms.map((item) => (
                  <RoomCard
                    room={item}
                    key={item.id}
                    handleSelect={handleSelectRoom}
                  />
                ))
              )}
            </div>
          )}
          {tab === Tab.CARS && (
            <div className="md:col-span-3 space-y-6">
              {isFetchingRoom ? (
                Array.from({ length: 10 }).map((key, idx) => (
                  <CarCardSkeleton key={idx} />
                ))
              ) : cars.length === 0 ? (
                <NotResult />
              ) : (
                cars.map((item) => (
                  <CarCard
                    car={item}
                    key={item.id}
                    handleSelect={handleSelectCard}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </Tabs>

      <Modal open={showModal} close={() => setShowModal(false)} size="3xl">
        <RoomReservationForm
          endDate={endDate as Date}
          starDate={startDate as Date}
          room={selectedRoom as Room}
          callback={callback}
        />
      </Modal>
      <Modal open={showModal2} close={() => setShowModal2(false)} size="3xl">
        <CarReservationForm
          endDate={endDate as Date}
          starDate={startDate as Date}
          car={selectedCar as Car}
          callback={callback}
        />
      </Modal>
    </div>
  );
}

function NotResult() {
  return (
    <>
      <div className="flex flex-col gap-y-3 items-center justify-center h-full w-full">
        <h1 className="text-4xl text-center font-medium">No hay resultado</h1>
        <SearchSlash className="size-20" />
      </div>
    </>
  );
}

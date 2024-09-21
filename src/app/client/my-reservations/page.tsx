/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { use, useState } from "react";
import { format } from "date-fns";
import { CarIcon, BedIcon, PlaneIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/components/table/table-date";
import { columnsReservationClient } from "./components/reservation-columns";
import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";
import useSessionStore from "@/store/useSession";

type Reservation = {
  id: number;
  startDate: Date;
  endDate: Date;
  days: number;
  totalCost: number;
  totalPersones: number | null;
  customerNotes: string | null;
  type: "CAR" | "ROOM" | "TRAVEL";
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
  userId: number;
  roomId: number | null;
  carId: number | null;
  driverId: number | null;
};

const mockReservations: Reservation[] = [
  {
    id: 1,
    startDate: new Date("2023-07-01"),
    endDate: new Date("2023-07-05"),
    days: 4,
    totalCost: 400,
    totalPersones: 2,
    customerNotes: "Late check-in",
    type: "ROOM",
    status: "Confirmed",
    userId: 1,
    roomId: 101,
    carId: null,
    driverId: null,
  },
  {
    id: 2,
    startDate: new Date("2023-08-10"),
    endDate: new Date("2023-08-15"),
    days: 5,
    totalCost: 250,
    totalPersones: null,
    customerNotes: null,
    type: "CAR",
    status: "Pending",
    userId: 1,
    roomId: null,
    carId: 201,
    driverId: null,
  },
  // Add more mock reservations as needed
];

export default function UserReservations() {
  const { user } = useSessionStore();

  const { data, isFetching } = useQuery({
    queryKey: ["my-reservation"],
    queryFn: () =>
      query
        .get("client/my-reservations", {
          params: { userId: user?.id },
        })
        .then((res) => res.data),
    initialData: [],
  });
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Mis Reservaciones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            {/* <Label htmlFor="search">Buscar</Label>
            <Input
              id="search"
              placeholder="Buscar por ID o notas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            /> */}
          </div>
          <div>
            {/* <Label htmlFor="type-filter">Tipo</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger id="type-filter">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos</SelectItem>
                <SelectItem value="CAR">Auto</SelectItem>
                <SelectItem value="ROOM">Habitación</SelectItem>
                <SelectItem value="TRAVEL">Viaje</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
          <div>
            {/* <Label htmlFor="status-filter">Estado</Label>
            {/* <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos</SelectItem>
                <SelectItem value="Pending">Pendiente</SelectItem>
                <SelectItem value="Confirmed">Confirmado</SelectItem>
                <SelectItem value="Cancelled">Cancelado</SelectItem>
                <SelectItem value="Completed">Completado</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
        </div>
        <DataTable
          columns={columnsReservationClient}
          data={data}
          keySearch={"days"}
          isLoading={isFetching}
        />
      </CardContent>
    </Card>
  );
}

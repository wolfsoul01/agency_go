/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CalendarDays, Car, Home, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";
import { GrafDriverLicencies } from "./components/graf-driver-licencies";
import FormVehicleSkeleton from "../vehicle/components/form-vehicle-skeleton";
import TopCars from "./components/top-cars";

export interface AnalyticsData {
  driversAvailable: DriversAvailable[];
  driversCount: number;
  totalCars: number;
  carsCount: number;
  carsAvailable: CarsAvailable[];
  carsNotAvailable: CarsAvailable[];
  totalRooms: number;
  roomsAvailable: any[];
  roomsNotAvailable: any[];
}

export interface CarsAvailable {
  id: number;
  title: string;
  make: string;
  model: string;
  status: string;
  type: string;
  year: number;
  priceForDay: number;
  available: boolean;
}

export interface DriversAvailable {
  id: number;
  firstName: string;
  lastName: string;
  license: string;
  age: number;
  phoneNumber: string;
  typeLicense: string;
  userId: number;
  imageId: number;
}

export default function DashboardPage() {
  const { isFetching, data } = useQuery<AnalyticsData | null>({
    queryKey: [`available`],
    queryFn: () => query.get("/analytic/available").then((res) => res.data),
    initialData: null,
  });

  if (isFetching) return <></>;
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Habitaciones Rentadas
            </CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.roomsAvailable?.length ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +10% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Autos Rentados
            </CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.carsAvailable?.length ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +5% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Choferes Activos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.driversAvailable?.length ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +2 desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <section className="col-span-2 h-full">
          <GrafDriverLicencies />
        </section>
        <section className="col-span-2">
          <TopCars />
        </section>
      </div>
    </div>
  );
}

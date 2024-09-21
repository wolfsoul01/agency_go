"use client";

import { DataTable } from "@/components/table/table-date";
import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";
import { columnsReservation } from "./components/reservation-columns";
import { useReservations } from "./hooks/useReservations";
import { addDays, startOfDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, CalendarDays, Car, HousePlus, Users } from "lucide-react";
import { useSummaryReservation } from "./hooks/useSummaryReservations";
import { formatCurrency } from "@/lib/utils";

function Reservations() {
  const [date, setDate] = useState<Date | undefined>(startOfDay(new Date()));

  const endDay = addDays(date as Date, 1);

  const { data: dayData, isFetching } = useReservations(date, endDay);

  const { data: summary } = useSummaryReservation(date);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Reservaciones</h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            onMonthChange={(date) => setDate(date)}
          />

          {
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Mes</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center space-x-4">
                  <Users className="size-6 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Total Reservaciones</p>
                    <p className="text-xl font-bold">
                      {summary.totalReservations}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <CalendarDays className="size-6 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      Ganancia Bruta del mes
                    </p>
                    <p className="text-xl font-bold">
                      {formatCurrency(summary.totalCost)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Calculator className="size-6 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Reservas</p>
                    <p className="text-xl font-bold flex gap-x-2 items-center">
                      <HousePlus className="h-4 w-4 " />
                      {summary.totalReservationsRoom}
                    </p>
                    <p className="text-xl font-bold flex gap-x-2 items-center">
                      <Car className="h-4 w-4 " />
                      {summary.totalReservationsCar}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          }
        </div>

        <div className="col-span-1 md:col-span-3 w-full">
          <DataTable
            columns={columnsReservation}
            data={dayData}
            keySearch={"user"}
            isLoading={isFetching}
          />
        </div>
      </section>
    </section>
  );
}

export default Reservations;

"use client";
import { DataTable } from "@/components/table/table-date";
import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";
import { Label } from "recharts";
import { columnsReservation } from "./components/reservation-columns";
import { useReservations } from "./hooks/useReservations";

function Reservations() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data, isFetching } = useReservations();
  return (
    <section className="">
      <header>
        <Label className="text-2xl">Reservaciones</Label>
      </header>

      <section className="max-w-fit grid grid-cols-1 md:grid-cols-4 gap-x-3">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />

        <div className="col-span-3 w-full">
          <DataTable
            columns={columnsReservation}
            data={data}
            keySearch={""}
            isLoading={isFetching}
          />
        </div>
      </section>
    </section>
  );
}

export default Reservations;

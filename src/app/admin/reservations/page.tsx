"use client"
import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";

function Reservations() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <section className="">
      <header>
        <h1>Reservations</h1>
      </header>

      <div className="max-w-fit">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          lang="es-Es"
        />
      </div>
    </section>
  );
}

export default Reservations;

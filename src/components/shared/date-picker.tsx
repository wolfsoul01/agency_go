"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { es } from "date-fns/locale";

interface Props {
  minDate?: Date;
  maxDate?: Date;
  onChange?: (date?: Date) => void;
  defaultDate?: Date;
  externalSate?: Date;
}

export function DatePicker({
  maxDate,
  minDate,
  onChange,
  defaultDate,
  externalSate,
}: Props) {
  const [date, setDate] = React.useState<Date | undefined>(
    defaultDate ?? new Date()
  );

  React.useEffect(() => {
    setDate(externalSate);
  }, [externalSate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: es })
          ) : (
            <span>Seleccione una fecha</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 ">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date);
            onChange && onChange(date);
          }}
          initialFocus
          minDate={minDate}
          maxDate={maxDate}
        />
      </PopoverContent>
    </Popover>
  );
}

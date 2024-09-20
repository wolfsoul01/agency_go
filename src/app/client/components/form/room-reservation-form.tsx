"use client";

import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { differenceInDays, endOfDay, format, startOfDay } from "date-fns";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { Room } from "@/interfaces/server-interface";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  starDate: z.date({
    required_error: "La fecha de check-in es requerida.",
  }),
  endDate: z.date({
    required_error: "La fecha de check-out es requerida.",
  }),
  totalPersones: z.preprocess(Number, z.number().positive().int()),
  codeDiscount: z.string(),
});

interface Props {
  starDate: Date;
  endDate: Date;
  room?: Room;
}

export default function RoomReservationForm({
  starDate,
  endDate,
  room,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      starDate,
      endDate,
    },
  });

  const { control } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Aquí iría la lógica para enviar los datos de reserva al servidor
  }

  const totalDays = useMemo(() => {
    return differenceInDays(endOfDay(endDate), startOfDay(starDate));
  }, [starDate, endDate]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="w-full max-w-7xl mx-auto col-span-3">
          <CardHeader>
            <div className="flex justify-between   ">
              <div>
                <CardTitle>Formulario de Reserva</CardTitle>
                <CardDescription>
                  Por favor, ingrese los detalles de su reserva.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
            <Label className="text-xl">
              Fecha de inicio : {format(starDate, "dd/MM/yyyy")}
            </Label>
            <Label className="text-xl">
              Fecha fin : {format(endDate, "dd/MM/yyyy")}
            </Label>

            <Separator className="col-span-full my-4" />
            <div className="space-y-2 col-span-2">
              <Label>Resumen de la Reserva</Label>
              <div className="rounded-md border p-4 space-y-2">
                <div className="flex justify-between">
                  <span>Total de días:</span>
                  <span className="font-medium">{totalDays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Precio por noche:</span>
                  <span className="font-medium">
                    {formatCurrency(room?.pricePerNight ?? 0)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total a pagar:</span>
                  <span>
                    {formatCurrency((room?.pricePerNight ?? 0) * totalDays)}
                  </span>
                </div>
              </div>
            </div>
            <Separator className="col-span-full my-4" />
            <FormInput
              control={control}
              label="Número de Personas"
              name="totalPersones"
            />
            <FormInput
              control={control}
              label="Código de descuento"
              name="codeDiscount"
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">
          Reservar ahora
        </Button>
      </form>
    </Form>
  );
}

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
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  startDate: z.date({
    required_error: "La fecha de inicio del alquiler es requerida.",
  }),
  endDate: z.date({
    required_error: "La fecha de fin del alquiler es requerida.",
  }),
  driverLicense: z
    .string()
    .min(1, "El número de licencia de conducir es requerido."),
  additionalDrivers: z.preprocess(Number, z.number().nonnegative().int()),
  insuranceOption: z.enum(["basic", "premium", "full"]),
});

interface Car {
  id: number;
  title: string;
  make: string;
  model: string;
  status: "OK" | "MAINTENANCE" | "UNAVAILABLE";
  type: string;
  year: number;
  priceForDay: number;
  available: boolean;
}

interface Props {
  startDate?: Date;
  endDate?: Date;
  car: Car;
}

export default function CarReservationForm({ startDate, endDate, car }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate,
      endDate,
      additionalDrivers: 0,
      insuranceOption: "basic",
    },
  });

  const { control } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Aquí iría la lógica para enviar los datos de reserva del auto al servidor
  }

  const totalDays = useMemo(() => {
    return differenceInDays(
      endOfDay(endDate as Date),
      startOfDay(startDate as Date)
    );
  }, [startDate, endDate]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="w-full max-w-7xl mx-auto col-span-3">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Formulario de Reserva de Auto</CardTitle>
                <CardDescription>
                  Por favor, ingrese los detalles de su reserva de auto.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
            <Label className="text-xl">
              Fecha de inicio: {format(startDate as Date, "dd/MM/yyyy")}
            </Label>
            <Label className="text-xl">
              Fecha fin: {format(endDate as Date, "dd/MM/yyyy")}
            </Label>

            <Separator className="col-span-full my-4" />
            <div className="space-y-2 col-span-2">
              <Label>Resumen de la Reserva</Label>
              <div className="rounded-md border p-4 space-y-2">
                <div className="flex justify-between">
                  <span>Auto:</span>
                  <span className="font-medium">
                    {car?.make} {car?.model} ({car?.year})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total de días:</span>
                  <span className="font-medium">{totalDays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Precio por día:</span>
                  <span className="font-medium">
                    {formatCurrency(car?.priceForDay ?? 0)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total a pagar:</span>
                  <span>
                    {formatCurrency((car?.priceForDay ?? 0) * totalDays)}
                  </span>
                </div>
              </div>
            </div>
            <Separator className="col-span-full " />
            <FormInput
              control={control}
              label="Número de Licencia de Conducir"
              name="driverLicense"
            />
            <FormInput
              control={control}
              label="Conductores Adicionales"
              name="additionalDrivers"
              type="number"
            />
            
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">
          Reservar Auto
        </Button>
      </form>
    </Form>
  );
}

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
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Card as Car } from "@/interfaces/server-interface";
import query from "@/lib/axios.config";
import { manageError } from "@/lib/manege-error";
import { AxiosError } from "axios";
import useSessionStore from "@/store/useSession";
import { toast } from "sonner";
import { FormTextArea } from "@/components/form/form-text-area";

const formSchema = z.object({
  starDate: z.date({
    required_error: "La fecha de inicio del alquiler es requerida.",
  }),
  endDate: z.date({
    required_error: "La fecha de fin del alquiler es requerida.",
  }),
  customerNotes: z.string().optional(),
});

interface Props {
  starDate?: Date;
  endDate?: Date;
  car: Car;
  callback?: () => void;
}

type IForm = z.infer<typeof formSchema>;

export default function CarReservationForm({
  starDate,
  endDate,
  car,
  callback,
}: Props) {
  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      starDate,
      endDate,
    },
  });
  const { user } = useSessionStore();
  const { control } = form;

  async function onSubmit(values: IForm) {
    try {
      await query.post("reservations/car", {
        carId: car?.id,
        userId: user?.id,
        startDate: new Date(values.starDate),
        endDate: new Date(values.endDate),
      });
      toast.success("La reserva se ha realizado con éxito");

      callback && callback();
    } catch (error) {
      manageError(error as AxiosError);
    }
  }

  const totalDays = useMemo(() => {
    return differenceInDays(
      endOfDay(endDate as Date),
      startOfDay(starDate as Date)
    );
  }, [starDate, endDate]);

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
              Fecha de inicio: {format(starDate as Date, "dd/MM/yyyy")}
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
            <div className="col-span-full">
              <FormTextArea
                control={control}
                name="customerNotes"
                label="Notas "
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full -mb-5">
          Reservar Auto
        </Button>
      </form>
    </Form>
  );
}

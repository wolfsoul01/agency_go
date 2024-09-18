/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormInput } from "@/components/form/form-input";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Loader2Icon, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormSelect, SelectItem } from "@/components/form/form-select";
import query from "@/lib/axios.config";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  title: z.string(),
  make: z.string(),
  model: z.string(),
  status: z.string().default("OK"),
  year: z.preprocess(Number, z.number().int().positive()),
  priceForDay: z.preprocess(Number, z.number().int().positive().default(0)),
  type: z.enum(["A", "B", "C1", "D1", "D"]),
});
type IForm = z.infer<typeof formSchema>;

interface Props {
  callback?: () => void;
  defaultValue?: any;
}

function FormVeihcle(props: Props) {
  const { callback, defaultValue } = props;

  const router = useRouter();


  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValue?.title,
      make: defaultValue?.make,
      status: defaultValue?.status,
      model: defaultValue?.model,
      year: defaultValue?.year,
      priceForDay: defaultValue?.priceForDay,
      type: defaultValue?.type,
    },
  });

  const { handleSubmit, control, watch } = form;
  console.log(watch());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const onSubmit = async (data: IForm) => {
    try {
      setIsLoading(true);
      console.log(data);
      try {
        defaultValue
          ? await query.patch(`/vehicles/${defaultValue.id}`, {
              ...data,
            })
          : await query.post("/vehicles", {
              ...data,
            });

        toast.success(
          defaultValue
            ? "Driver update  successfully"
            : "Driver added successfully"
        );
        callback && callback();
      } catch (error: any) {
        toast.error(error.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleted = async (id: number) => {
    setIsDeleted(true);
    try {
      await query.delete(`/vehicles/${id}`).finally(() => setIsDeleted(false));
      router.back();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const dataSelect: SelectItem[] = [
    {
      value: "A",
      label: "A (Motocicletas y ciclomotores)",
    },
    {
      value: "B",
      label: "B (Automóviles, camionetas y vehículos ligeros)",
    },
    {
      value: "C",
      label: "C (Camiones de más de 3.5 toneladas)",
    },
    {
      value: "C1",
      label: "C1 (Camiones ligeros de hasta 3.5 toneladas)",
    },
    {
      value: "D",
      label: "D (Autobuses y vehículos de transporte público)",
    },
    {
      value: "D1",
      label: "D1 (Microbuses de transporte de pasajeros)",
    },
  ];

  const statusSelect: SelectItem[] = [
    {
      label: "Buen Estado",
      value: "OK",
    },
    {
      label: "Averiado",
      value: "BROKEN",
    },
    {
      label: "Desconocido",
      value: "SOLD",
    },
  ];

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1   gap-x-5 gap-y-3 "
        >
          <Card className="w-full max-w-7xl mx-auto col-span-3">
            <CardHeader>
              <div className="flex justify-between   ">
                <div>
                  <CardTitle>Formulario de Autos</CardTitle>
                  <CardDescription>
                    Por favor, ingrese los detalles del auto.
                  </CardDescription>
                </div>
                {defaultValue && (
                  <Button
                    variant={"destructive"}
                    className="flex items-center gap-x-2 mt-auto"
                    onClick={() => handleDeleted(defaultValue?.id as number)}
                    type="button"
                    disabled={isDeleted}
                  >
                    {" "}
                    {isDeleted ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      <Trash />
                    )}{" "}
                    Borrar
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <FormInput
                      control={control}
                      name="title"
                      label="Titulo"
                      className=""
                    />
                  </div>
                  <div className="space-y-2">
                    <FormInput control={control} name="make" label="Marca" />
                  </div>
                  <div className="space-y-2">
                    <FormInput control={control} name="model" label="Modelo" />
                  </div>
                  <div className="space-y-2">
                    <FormInput
                      control={control}
                      name="priceForDay"
                      label="Precio por dia"
                      type="number"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <FormSelect
                      control={control}
                      name="status"
                      label="Estado"
                      selectItem={statusSelect}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormSelect
                      control={control}
                      name="type"
                      label="Tipo de licencia"
                      selectItem={dataSelect}
                    />
                  </div>
                  <div className=" w-full">
                    <FormInput
                      control={control}
                      name="year"
                      label="Año"
                      type="number"
                    />
                  </div>
                 
                </div>
              </div>
            </CardContent>
          </Card>

          <footer className="col-span-full mt-3">
            <Button
              type="submit"
              className="w-full font-semibold flex gap-x-2"
              disabled={isLoading || isDeleted}
            >
              {isLoading && <Loader2 className="animate-spin" />}
              {defaultValue ? "Editar" : "Agregar"}
            </Button>
          </footer>
        </form>
      </Form>
    </div>
  );
}

export default FormVeihcle;

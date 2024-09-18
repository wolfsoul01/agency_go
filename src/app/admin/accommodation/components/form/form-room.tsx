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
import { Room } from "@/interfaces/server-interface";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormSelect, SelectItem } from "@/components/form/form-select";
import query from "@/lib/axios.config";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import RoomImageUpload from "../room-image-upload";

const formSchema = z.object({
  name: z.string().nonempty("El nombre es obligatorio"),
  description: z.string().optional(),
  totalPersons: z.preprocess(
    Number,
    z.number().min(1, "Debe haber al menos 1 persona")
  ),
  pricePerNight: z.preprocess(
    Number,
    z.number().min(0, "El precio debe ser positivo")
  ),
  status: z.enum([
    "AVAILABLE",
    "OCCUPIED",
    "MAINTENANCE",
    "RESERVED",
    "OUT_OF_SERVICE",
  ]),
});

type IForm = z.infer<typeof formSchema>;

interface Props {
  callback?: () => void;
  defaultValue?: Room;
}

function FormRoom(props: Props) {
  const { callback, defaultValue } = props;

  const router = useRouter();

  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValue?.name || "",
      description: defaultValue?.description || "",
      totalPersons: defaultValue?.totalPersons || 1,
      pricePerNight: defaultValue?.pricePerNight || 0,
      status: defaultValue?.status || "AVAILABLE",
    },
  });

  const { handleSubmit, control } = form;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const onSubmit = async (data: IForm) => {
    try {
      setIsLoading(true);
      try {
        defaultValue
          ? await query.patch(`/room/${defaultValue.id}`, { ...data })
          : await query.post("/room", { ...data });

        toast.success(
          defaultValue ? "Room updated successfully" : "Room added successfully"
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
      await query.delete(`/room/${id}`).finally(() => setIsDeleted(false));
      router.back();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const statusOptions: SelectItem[] = [
    { value: "AVAILABLE", label: "Disponible" },
    { value: "OCCUPIED", label: "Ocupada" },
    { value: "MAINTENANCE", label: "En Mantenimiento" },
    { value: "RESERVED", label: "Reservada" },
    { value: "OUT_OF_SERVICE", label: "Fuera de Servicio" },
  ];

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-x-5 gap-y-3 max-w-7xl"
        >
          <Card className="w-full  mx-auto  ">
            <CardHeader >
              <div className="flex ice justify-between">
                <div>
                  <CardTitle>Formulario de Habitación</CardTitle>
                  <CardDescription>
                    Por favor, ingrese los detalles de la habitación.
                  </CardDescription>
                </div>

                {defaultValue && (
                  <div>
                    <Button
                      variant={"destructive"}
                      className="flex items-center gap-x-2 mt-auto"
                      onClick={() => handleDeleted(defaultValue?.id as number)}
                      type="button"
                      disabled={isDeleted}
                    >
                      {isDeleted ? (
                        <Loader2Icon className="animate-spin" />
                      ) : (
                        <Trash />
                      )}{" "}
                      Borrar
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormInput control={control} name="name" label="Nombre" />
                  <FormInput
                    control={control}
                    name="description"
                    label="Descripción"
                  />
                  <FormInput
                    control={control}
                    name="totalPersons"
                    label="Total de Personas"
                    type="number"
                  />
                </div>
                <div className="space-y-4">
                  <FormInput
                    control={control}
                    name="pricePerNight"
                    label="Precio por Noche"
                    type="number"
                  />
                  <FormSelect
                    control={control}
                    name="status"
                    label="Estado"
                    selectItem={statusOptions}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {defaultValue && (
            <Card>
              <CardContent className="flex flex-col justify-between h-full p-10 w-full">
                <RoomImageUpload
                  roomId={defaultValue?.id}
                  defaultImageUrl={defaultValue?.Image?.url}
                  //   onUpload={async (file: File) => {
                  //     const formData = new FormData();
                  //     formData.append("file", file);
                  //     formData.append(
                  //       "roomId",
                  //       defaultValue?.id.toString() ?? ""
                  //     );

                  //     await query.post("/room/upload", formData);
                  //   }}
                  //   defaultImage={defaultValue?.image?.url}
                />
              </CardContent>
            </Card>
          )}

          <footer className="col-span-full mt-3 w-full">
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

export default FormRoom;

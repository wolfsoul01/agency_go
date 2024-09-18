/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormInput } from "@/components/form/form-input";
import React, { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {  Loader2, Loader2Icon, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Provinces, Room } from "@/interfaces/server-interface";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormSelect, SelectItem } from "@/components/form/form-select";
import query from "@/lib/axios.config";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import RoomImageUpload from "../room-image-upload";
import { FormAsyncSelect } from "@/components/form/form-async-select";
import { FormTextArea } from "@/components/form/form-text-area";
import { manageError } from "@/lib/manege-error";
import { formSchemaRoom, IFormRoom } from "./form-shcema";


interface Props {
  callback?: () => void;
  defaultValue?: Room;
}

function FormRoom(props: Props) {
  const { callback, defaultValue } = props;

  const router = useRouter();

  const form = useForm<IFormRoom>({
    resolver: zodResolver(formSchemaRoom),
    defaultValues: {
      name: defaultValue?.name || "",
      description: defaultValue?.description || "",
      totalPersons: defaultValue?.totalPersons || 1,
      pricePerNight: defaultValue?.pricePerNight || 0,
      status: defaultValue?.status || "AVAILABLE",
    },
  });

  //States 
  const { handleSubmit, control, watch } = form;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  //Form state
  const provinceId = watch("provinceId");

  //Form submit
  const onSubmit = async (data: IFormRoom) => {
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

  const onFetch = async () => {
    try {
      const response = await query.get<Provinces[]>("/address/provinces");
      const provinces: SelectItem[] = response.data.map((item) => {
        return { value: item.id.toString(), label: item.name };
      });

      return provinces;
    } catch (error) {
      manageError(error);
    }
  };

  const on = useCallback(
    async (id: string | undefined) => {
      try {
        if (!id) return;
        const response = await query.get<Provinces[]>(
          `/address/municipalities/${id}`
        );
        const provinces: SelectItem[] = response.data.map((item) => {
          return { value: item.id.toString(), label: item.name };
        });

        return provinces;
      } catch (error) {
        manageError(error);
      }
    },
    [provinceId]
  );

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-x-5 gap-y-3 max-w-7xl"
        >
          <Card className="w-full  mx-auto  ">
            <CardHeader>
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
                    name="totalPersons"
                    label="Total de Personas"
                    type="number"
                  />
                </div>
                <div className="space-y-4">
                  <FormInput
                    control={control}
                    name="pricePerNight"
                    label="Precio por Noche $"
                    type="number"
                  />
                  <FormSelect
                    control={control}
                    name="status"
                    label="Estado"
                    selectItem={statusOptions}
                  />
                </div>
                <div className="space-y-4">
                  <FormAsyncSelect
                    control={control}
                    name="provinceId"
                    label="Municipio"
                    onFetch={onFetch}
                  />
                </div>
                <div>
                  <FormAsyncSelect
                    control={control}
                    name="municipalityId"
                    label="Provincia"
                    onFetch={() => on(provinceId)}
                  />
                </div>

                <div className="col-span-full">
                  <FormTextArea
                    control={control}
                    name="description"
                    label="Descripción"
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

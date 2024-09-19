/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormInput } from "@/components/form/form-input";
import React, { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Provinces, Room } from "@/interfaces/server-interface";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormSelect, SelectItem } from "@/components/form/form-select";
import query from "@/lib/axios.config";
import { toast } from "sonner";
import RoomImageUpload from "../room-image-upload";
import { FormAsyncSelect } from "@/components/form/form-async-select";
import { FormTextArea } from "@/components/form/form-text-area";
import { manageError } from "@/lib/manege-error";
import { formSchemaRoom, IFormRoom } from "./form-shcema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormRoomHeader from "./form-header";

interface Props {
  callback?: () => void;
  defaultValue?: Room;
}

function FormRoom(props: Props) {
  const { callback, defaultValue } = props;

  const form = useForm<IFormRoom>({
    resolver: zodResolver(formSchemaRoom),
    defaultValues: {
      name: defaultValue?.name || "",
      description: defaultValue?.description || "",
      totalPersons: defaultValue?.totalPersons || 1,
      pricePerNight: defaultValue?.pricePerNight || 0,
      status: defaultValue?.status || "AVAILABLE",
      city: defaultValue?.Address?.city || "",
      provinceId: defaultValue?.Address?.provinceId,
      municipalityId: defaultValue?.Address?.municipalityId,
      street_1: defaultValue?.Address?.street_1 || "",
    },
  });

  //States
  const { handleSubmit, control, watch } = form;
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const statusOptions: SelectItem[] = [
    { value: "AVAILABLE", label: "Disponible" },
    { value: "OCCUPIED", label: "Ocupada" },
    { value: "MAINTENANCE", label: "En Mantenimiento" },
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

  enum TabsValues {
    INFORMATION = "INFORMATION",
    ADDRESS = "ADDRESS",
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-x-5 gap-y-3 max-w-7xl  "
        >
          <Tabs defaultValue={TabsValues.INFORMATION}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value={TabsValues.INFORMATION}>
                Información
              </TabsTrigger>
              <TabsTrigger value={TabsValues.ADDRESS}>Dirección</TabsTrigger>
            </TabsList>
            <TabsContent value={TabsValues.INFORMATION}>
              <Card className="w-full  mx-auto  ">
                <FormRoomHeader defaultValue={defaultValue} />

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
            </TabsContent>

            <TabsContent value={TabsValues.ADDRESS}>
              <Card className="w-full  mx-auto  ">
                <FormRoomHeader defaultValue={defaultValue} />
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <FormAsyncSelect
                        control={control}
                        name="provinceId"
                        label="Provincia"
                        onFetch={onFetch}
                      />
                    </div>
                    <div>
                      <FormAsyncSelect
                        control={control}
                        name="municipalityId"
                        label="Municipio"
                        onFetch={() => on(provinceId?.toString())}
                        dependencies={provinceId}
                      />
                    </div>

                    <div>
                      <FormInput
                        control={control}
                        name="street_1"
                        label="Dirección"
                      />
                    </div>
                    <div>
                      <FormInput
                        control={control}
                        name="city"
                        label="Localidad"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {defaultValue && (
            <Card>
              <CardContent className="flex flex-col justify-between h-full p-10 w-full">
                <RoomImageUpload
                  roomId={defaultValue?.id}
                  defaultImageUrl={defaultValue?.Image?.url}
                />
              </CardContent>
            </Card>
          )}

          <footer className="col-span-full mt-3 w-full">
            <Button
              type="submit"
              className="w-full font-semibold flex gap-x-2"
              disabled={isLoading}
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

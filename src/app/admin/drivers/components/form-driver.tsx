/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormInput } from "@/components/form/form-input";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Loader2Icon, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Driver } from "@/interfaces/server-interface";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormSelect, SelectItem } from "@/components/form/form-select";
import query from "@/lib/axios.config";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ProfilePhotoUpload from "@/components/shared/profile-photo-upload";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  license: z.string().min(10).max(25),
  age: z.any().transform(Number),
  phoneNumber: z.string().optional(),
  typeLicense: z.enum(["A", "B", "C1", "D1", "D"]),
});
type IForm = z.infer<typeof formSchema>;

interface Props {
  callback?: () => void;
  defaultValue?: Driver;
}

function FormDriver(props: Props) {
  const { callback, defaultValue } = props;

  const router = useRouter();

  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: defaultValue?.firstName,
      lastName: defaultValue?.lastName,
      license: defaultValue?.license,
      age: defaultValue?.age,
      phoneNumber: defaultValue?.phoneNumber,
      typeLicense: defaultValue?.typeLicense,
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
          ? await query.patch(`/driver/${defaultValue.id}`, {
              ...data,
            })
          : await query.post("/driver", {
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
      await query.delete(`/driver/${id}`).finally(() => setIsDeleted(false));
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

  const handleUpload = async (data: File) => {
    const formData = new FormData();
    formData.append("file", data);
    formData.append("driverId", defaultValue?.id.toString() ?? "");

    query.post("/driver/upload", formData);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-4  gap-x-5 gap-y-3 "
        >
          {defaultValue && (
            <Card>
              <CardContent className=" flex flex-col justify-between h-full  p-10">
                <ProfilePhotoUpload
                  onUpload={handleUpload}
                  defaultImage={defaultValue?.image?.url}
                />

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
              </CardContent>
            </Card>
          )}
          <Card className="w-full max-w-7xl mx-auto col-span-3">
            <CardHeader>
              <div className="flex justify-between   ">
                <div>
                  <CardTitle>Formulario de Conductor</CardTitle>
                  <CardDescription>
                    Por favor, ingrese los detalles del conductor.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <FormInput
                      control={control}
                      name="firstName"
                      label="Nombre"
                      className=""
                    />
                  </div>
                  <div className="space-y-2">
                    <FormInput
                      control={control}
                      name="lastName"
                      label="Apellidos"
                    />
                  </div>
                  <div className="space-y-2">
                    <FormInput
                      control={control}
                      name="age"
                      type="number"
                      label="Edad"
                    />
                  </div>
                  <div className="space-y-2">
                    <FormInput
                      control={control}
                      name="phoneNumber"
                      label="Teléfono"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <FormInput
                      control={control}
                      name="license"
                      label="Licencia"
                    />
                  </div>
                  <div className="space-y-2">
                    <FormSelect
                      control={control}
                      name="typeLicense"
                      label="Tipo de licencia"
                      selectItem={dataSelect}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="activo" />
                    <Label>Conductor Activo</Label>
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

export default FormDriver;

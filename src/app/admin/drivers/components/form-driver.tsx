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
import { Input } from "@/components/ui/input";
import { Driver } from "@/interfaces/server-interface";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormSelect, SelectItem } from "@/components/form/form-select";
import query from "@/lib/axios.config";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  license: z.string().min(10).max(25),
  age: z.string().transform(Number),
  phoneNumber: z.string().optional(),
  type_license: z.string().optional(),
});
type IForm = z.infer<typeof formSchema>;

interface Props {
  callback?: () => void;
  defaultValue?: Driver;
}

function FormDriver(props: Props) {
  const { callback, defaultValue } = props;

  const router = useRouter()

  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: defaultValue?.firstName,
      lastName: defaultValue?.lastName,
      license: defaultValue?.license,
      age: defaultValue?.age,
      phoneNumber: defaultValue?.phoneNumber,
    },
  });

  const { handleSubmit, control } = form;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const onSubmit = async (data: IForm) => {
    try {
      setIsLoading(true);
      console.log(data);
      try {
        defaultValue
          ? await query.patch(`/driver/${defaultValue.id}`, {
              ...data,
            })
          : await query.post("/driver", {
              ...data,
            });
      } catch (error: any) {
        toast.error(error.message);
      }

      callback && callback();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      toast.success(
        defaultValue
          ? "Driver update  successfully"
          : "Driver added successfully"
      );
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
      name: "A",
      label: "A",
    },
    {
      name: "B",
      label: "B",
    },
  ];

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1  gap-x-5 gap-y-3 "
        >
          <Card className="w-full max-w-7xl mx-auto">
            <CardHeader>
              <div className="flex justify-between   ">
                <div>
                  <CardTitle>Formulario de Conductor</CardTitle>
                  <CardDescription>
                    Por favor, ingrese los detalles del conductor.
                  </CardDescription>
                </div>

                {defaultValue && (
                  <Button
                    variant={"destructive"}
                    className="flex items-center gap-x-2"
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
                      name="type_license"
                      label="Tipo de licencia"
                      selectItem={dataSelect}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="activo" />
                    <Label>Conductor Activo</Label>
                  </div>
                  <div className="space-y-2">
                    <Label>Foto del Conductor</Label>
                    <Input id="foto" type="file" accept="image/*" />
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

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormInput } from "@/components/form/form-input";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
import ImageUpload from "@/components/shared/ImageUpload";
import query from "@/lib/axios.config";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  license: z.string().min(10).max(25),
  age: z.number().min(18).max(90),
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

  console.log(defaultValue?.firstName);

  const { handleSubmit, control } = form;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (data: IForm) => {
    try {
      setIsLoading(true);
      try {
        await query.post("/driver", {
            ...data,
          });
      } catch (error) {
        alert("Error");
      }
     
      callback && callback();
    } catch (error) {
    } finally {
      setIsLoading(false);
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
          className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3 "
        >
          <Card className="w-full max-w-7xl mx-auto">
            <CardHeader>
              <CardTitle>Formulario de Conductor</CardTitle>
              <CardDescription>
                Por favor, ingrese los detalles del conductor.
              </CardDescription>
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

          <div>
            <ImageUpload />
          </div>

          <footer className="col-span-full mt-3">
            <Button
              type="submit"
              className="w-full font-semibold flex gap-x-2"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="animate-spin" />}
              Agregar
            </Button>
          </footer>
        </form>
      </Form>
    </div>
  );
}

export default FormDriver;

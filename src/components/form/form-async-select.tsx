"use client";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import AsyncSelect from "../shared/select-async";
import { SelectItem } from "./form-select";

interface FormInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: React.ReactNode;
  onFetch: () => Promise<SelectItem[] | undefined>;
  dependencies?: string | number;
}

export function FormAsyncSelect<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  onFetch,
  dependencies
}: FormInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel className="font-medium">{label}</FormLabel>
          <FormControl>
            <>
              <AsyncSelect
                onFetch={onFetch}
                onSelect={field.onChange}
                field={field.value}
                dependencies={dependencies}
              />
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

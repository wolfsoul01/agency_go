"use client";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "../ui/checkbox";

interface FormInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: React.ReactNode;
}

export function FormCheckbox<TFieldValues extends FieldValues>({
  name,
  control,
  label,
}: FormInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative flex items-center gap-x-2">
          <FormControl className="flex gap-x-2">
            <>
              <Checkbox onCheckedChange={field.onChange} />
            </>
          </FormControl>
          <FormLabel className="font-medium pb-2.5">{label}</FormLabel>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { HTMLInputTypeAttribute } from "react";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "../shared/date-picker";

interface FormInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  className?: React.HTMLAttributes<HTMLIFrameElement>["className"];
}

export function FormDatePicker<TFieldValues extends FieldValues>({
  name,
  control,
  label,
}: FormInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DatePicker />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

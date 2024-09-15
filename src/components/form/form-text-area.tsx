/* eslint-disable @typescript-eslint/no-unused-vars */
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import {  HTMLInputTypeAttribute } from "react";
import { Textarea } from "../ui/textarea";

interface FormInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?:React.HTMLAttributes<HTMLIFrameElement>["className"]
}

export function FormTextArea<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  className
}: FormInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder}  {...field}  className={className}/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

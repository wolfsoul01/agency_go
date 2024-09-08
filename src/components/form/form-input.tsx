"use client";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { HTMLInputTypeAttribute, useState } from "react";
import { Eye, EyeIcon, EyeOff } from "lucide-react";
import { Icon } from "@radix-ui/react-select";

interface FormInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: React.ReactNode;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  icon?: React.ReactNode;
  className?: React.HTMLAttributes<HTMLIFrameElement>["className"];
}

export function FormInput<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  className,
  icon,
}: FormInputProps<TFieldValues>) {
  const [viewPassword, setViewPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel className="font-medium">{label}</FormLabel>
          <FormControl>
            <>
              <Input
                placeholder={placeholder}
                type={viewPassword ? "text" : type}
                {...field}
                className={className}
              />
              <aside className="absolute top-8 right-3 flex gap-x-3">
                {icon && icon}
                {type === "password" && (
                  <Icon className="cursor-pointer">
                    {!viewPassword && (
                      <EyeOff
                      strokeWidth={1.5}
                        onClick={() => setViewPassword(true)}
                      />
                    )}
                    {viewPassword && (
                      <EyeIcon
                        strokeWidth={1.5}
                        onClick={() => setViewPassword(false)}
                      />
                    )}
                  </Icon>
                )}
              </aside>
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

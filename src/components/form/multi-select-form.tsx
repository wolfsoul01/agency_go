"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "../ui/checkbox";
import { SelectItem } from "./form-select";
import { ScrollArea } from "../ui/scroll-area";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem } from "../ui/form";

interface FormMultiSelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  items: SelectItem[];
}

export function FormMultiSelect<TFieldValues extends FieldValues>(
  props: FormMultiSelectProps<TFieldValues>
) {
  const { items, name, control } = props;
  const [open, setOpen] = React.useState(false);

  const searchItem = (value: string) => {
    return items
      .map((item) => {
        if (value === item.value) return item.label;
      })
      .filter((item) => item);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {field.value.length === 0 
                  ? "Seleccione..."
                  : field.value.length > 2
                  ? `${field.value.length} seleccionados`
                  : field.value.map(searchItem).join(", ")}
                <ChevronsUpDown className=" h-4 w-4 shrink-0 opacity-50 " />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Buscar..." />
                <CommandList>
                  <CommandEmpty>{"No se encontró resultado..."}</CommandEmpty>
                  <CommandGroup>
                    <ScrollArea className="h-40">
                      {items.map((item) => {
                        const checked = !!field.value.find(
                          (select: string) => select === item.value
                        );
                        return (
                          <CommandItem
                            key={item.value}
                            value={item.value}
                            onSelect={(currentValue) => {
                              const exist = field.value.find(
                                (item: string) => item === currentValue
                              );

                              if (exist) {
                                field.onChange(
                                  field.value.filter(
                                    (item: string) => item !== currentValue
                                  )
                                );
                              } else {
                                field.onChange([...field.value, item.value]);
                              }
                              setOpen(false);
                            }}
                          >
                            <Checkbox checked={checked} className="mr-3" />
                            {item.label}
                          </CommandItem>
                        );
                      })}
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}

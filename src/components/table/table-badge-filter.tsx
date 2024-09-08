"use client";
import { LucideIcon, PlusCircle } from "lucide-react";
import { Table } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type Select = {
  value: string;
  label: string;
  icon: LucideIcon;
};

interface TableBadgeFilterProps<TData> {
  table: Table<TData>;
  data: Select[];
  colToFilter: string;
  placeholder?: string;
  placeholderNotFound?: string;
}

export function TableBadgeFilter<TData>(props: TableBadgeFilterProps<TData>) {
  const { table, data, colToFilter, placeholderNotFound, placeholder } = props;

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Select[]>([]);

  useEffect(() => {
    table
      .getColumn(colToFilter)
      ?.setFilterValue(values.map((item) => item.value));
  }, [values]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between"
        >
          <PlusCircle className="mr-2 size-5" />
          {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
          {placeholder ?? "Buscar..."}

          {values.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2" />
              {values.length >= 3 ? (
                <Badge className="rounded-sm">
                  {values.length} seleccionados
                </Badge>
              ) : (
                values.map((item) => (
                  <Badge
                    key={item.value}
                    className="m-1 justify-between rounded-sm"
                  >
                    {item.label}
                  </Badge>
                ))
              )}
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar tipo..." />
          <CommandList>
            <CommandEmpty>
              {placeholderNotFound ?? "No se encontró resultado..."}
            </CommandEmpty>
            <CommandGroup>
              {data.map((item) => {
                const checked = !!values.find(select => select.value ===  item.value);
                return (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      const exist = values.find(
                        (item) => item.value === currentValue
                      );

                      if (exist) {
                        setValues(
                          values.filter((item) => item.value !== currentValue)
                        );
                      } else {
                        setValues([...values, item]);
                      }
                      setOpen(false);
                    }}
                  >
                    <Checkbox
                      checked={checked}
                      className="mr-3"
                    />
                    <item.icon className="size-5 mx-1.5" strokeWidth={1.2} />
                    {item.label}
                  </CommandItem>
                );
              })}
              <Separator className="my-1" />
              <CommandItem
                className="flex justify-center items-center gap-x-2"
                onSelect={() => setValues([])}
              >
                {/* <Eraser className="size-5" /> */}
                Limpiar filtros
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

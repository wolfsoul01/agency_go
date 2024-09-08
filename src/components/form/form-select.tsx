import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SelectItem = {
  name: string;
  label: string;
};

interface FormInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  selectItem: SelectItem[];
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}

export function FormSelect<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  selectItem,
  className,
}: FormInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectItem.map((item) => {
                    return (
                      <SelectItem key={item.name} value={item.name}>{item.label}</SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

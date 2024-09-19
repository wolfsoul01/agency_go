import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { type SelectItem as SelectItemI } from "../form/form-select";

interface AsyncSelectProps {
  onFetch: () => Promise<SelectItemI[] | undefined>;
  onSelect: (value: string) => void;
  field: string | undefined;
  dependencies?: string | number;
}

const AsyncSelect: React.FC<AsyncSelectProps> = ({
  onFetch,
  onSelect,
  field,
  dependencies,
}) => {
  const [options, setOptions] = useState<SelectItemI[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // Fetch data when the component mounts
  const fetchOptions = async () => {
    setLoading(true);
    try {
      const res = await onFetch();
      setOptions(res ?? []);
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (dependencies) {
      fetchOptions();
      return;
    }

    if (options.length === 0) {
      fetchOptions();
      return;
    }
  }, [onFetch, dependencies]);

  console.log("field", field);
  console.log("options", options);

  return (
    <Select
      onValueChange={onSelect}
      disabled={options.length === 0}
      defaultValue={field?.toString()}
    >
      <SelectTrigger>
        <SelectValue placeholder={loading ? "Cargando..." : "Seleccione..."} />
      </SelectTrigger>
      <SelectContent className="max-h-60">
        {options?.map((option, index) => (
          <SelectItem key={index} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AsyncSelect;

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
}

const AsyncSelect: React.FC<AsyncSelectProps> = ({ onFetch, onSelect }) => {
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
    if (options.length === 0) {
      fetchOptions();
    }
  }, [onFetch]);

  console.log(options);

  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue
          placeholder={loading ? "Cargando..." : "Seleccione..."}
        />
      </SelectTrigger>
      <SelectContent>
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

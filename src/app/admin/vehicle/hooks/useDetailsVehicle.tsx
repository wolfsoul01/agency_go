"use client";
import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";

const fetch = async (id: number) => {
  const response = await query.get(`/vehicles/${id}`);
  return response.data;
};

export const useDetailVehicle = (id: number) => {
  const query = useQuery({
    queryKey: [`vehicle-${id}`],
    queryFn: () => fetch(id),
    initialData: null,
  });

  return {
    ...query,
  };
};

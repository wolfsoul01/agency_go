"use client";
import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";

const fetch = async () => {
  const response = await query.get("/vehicles");
  return response.data;
};

export const useVehicle = () => {
  const query = useQuery({
    queryKey: ["vehicles"],
    queryFn: fetch,
    initialData: [],
  });

  return {
    ...query,
  };
};

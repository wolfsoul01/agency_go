"use client";
import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";
import { Card } from "@/interfaces/server-interface";

const fetch = async (startDate?: Date, endDate?: Date, price?: number) => {
  const response = await query.get("/client/cars", {
    params: { startDate, endDate, price },
  });
  return response.data;
};

export const useCars = (startDate?: Date, endDate?: Date, price?: number) => {
  const query = useQuery<Card[]>({
    queryKey: ["cars", startDate, endDate],
    queryFn: () => fetch(startDate, endDate, price),
    initialData: [],
  });

  return {
    ...query,
  };
};

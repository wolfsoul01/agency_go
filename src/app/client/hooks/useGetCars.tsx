"use client";
import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";
import { Card } from "@/interfaces/server-interface";

const fetch = async (startDate?: Date, endDate?: Date) => {
  const response = await query.get("/client/cars", {
    params: { startDate, endDate },
  });
  return response.data;
};

export const useCars = (startDate?: Date, endDate?: Date) => {
  const query = useQuery<Card[]>({
    queryKey: ["cars", startDate, endDate],
    queryFn: () => fetch(startDate, endDate),
    initialData: [],
  });

  return {
    ...query,
  };
};

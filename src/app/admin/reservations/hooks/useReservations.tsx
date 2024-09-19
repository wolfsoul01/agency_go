"use client";
import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";

const fetchReservations = async (startDate?: Date, endDate?: Date) => {
  const response = await query.get(`/reservations`, {
    params: { startDate, endDate },
  });
  return response.data;
};

export const useReservations = (startDate?: Date , endDate?: Date) => {
  const query = useQuery({
    queryKey: ["reservations", startDate],
    queryFn: () => fetchReservations(startDate, endDate),
    initialData: [],
    enabled:!!startDate
  });

  return {
    ...query,
  };
};

"use client";
import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";
import { SummaryReservations } from "@/interfaces/server-interface";

const fetchReservations = async (date?: Date) => {
  const response = await query.get(`/reservations/summary`, {
    params: { date },
  });
  return response.data;
};

export const useSummaryReservation = (date?: Date) => {
  const query = useQuery<SummaryReservations>({
    queryKey: ["reservations", "summary", date],
    queryFn: () => fetchReservations(date),
    initialData: {
      totalCost: 0,
      totalReservations: 0,
      totalReservationsCar: 0,
      totalReservationsRoom: 0,
    },
    enabled: !!date,
  });

  return {
    ...query,
  };
};

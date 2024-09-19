"use client";
import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";
import { SummaryReservations } from "@/interfaces/server-interface";
import { getMonth } from "date-fns";

const fetchReservations = async (date?: Date) => {
  const response = await query.get(`/reservations/summary`, {
    params: { date },
  });
  return response.data;
};

export const useSummaryReservation = (date?: Date) => {
  const moth = getMonth(date as Date);

  console.log(moth);

  const query = useQuery<SummaryReservations>({
    queryKey: ["reservations", "summary", moth],
    queryFn: () => fetchReservations(date),
    initialData: {
      totalCost: 0,
      totalReservations: 0,
      totalReservationsCar: 0,
      totalReservationsRoom: 0,
    },
    enabled: !!date,
    //staleTime: 0,
  });

  return {
    ...query,
  };
};

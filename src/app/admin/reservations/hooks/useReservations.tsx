"use client";
import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";

const fetchReservations = async () => {
  const response = await query.get("/reservations");
  return response.data;
};

export const useReservations = () => {
  const query = useQuery({
    queryKey: ["reservations"],
    queryFn: fetchReservations,
    initialData: [],
  });

  return {
    ...query,
  };
};

"use client";
import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";
import { Room } from "@/interfaces/server-interface";

const fetch = async (
  startDate?: Date,
  endDate?: Date,
  price?: number,
  totalPersons?: number
) => {
  const response = await query.get("/client/rooms", {
    params: { startDate, endDate, price, totalPersons },
  });
  return response.data;
};

export const useRooms = (
  startDate?: Date,
  endDate?: Date,
  price?: number,
  totalPersons?: number
) => {
  const query = useQuery<Room[]>({
    queryKey: [
      "rooms",
      startDate?.toISOString(),
      endDate?.toISOString(),
    ],
    queryFn: () => fetch(startDate, endDate, price, totalPersons),
    initialData: [],
  });

  return {
    ...query,
  };
};

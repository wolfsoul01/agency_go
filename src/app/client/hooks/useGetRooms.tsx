"use client";
import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";
import { Room } from "@/interfaces/server-interface";

const fetch = async (startDate?: Date, endDate?: Date) => {
  const response = await query.get("/client/rooms", {
    params: { startDate, endDate },
  });
  return response.data;
};

export const useRooms = (startDate?: Date, endDate?: Date) => {
  const query = useQuery<Room[]>({
    queryKey: ["rooms", startDate?.toISOString(), endDate?.toISOString()],
    queryFn: () => fetch(startDate, endDate),
    initialData: [],
  });

  return {
    ...query,
  };
};

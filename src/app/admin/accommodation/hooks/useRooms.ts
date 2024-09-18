"use client";
import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";

const fetch = async () => {
  const response = await query.get("/room");
  return response.data;
};

export const useRooms = () => {
  const query = useQuery({
    queryKey: ["rooms"],
    queryFn: fetch,
    initialData: [],
  });

  return {
    ...query,
  };
};

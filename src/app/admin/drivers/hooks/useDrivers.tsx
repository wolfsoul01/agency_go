"use client";
import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";

const fetchDriver = async () => {
  const response = await query.get("/driver");
  return response.data;
};

export const useDriver = () => {
  const query = useQuery({
    queryKey: ["driver"],
    queryFn: fetchDriver,
    initialData: [],
  });

  return {
    ...query,
  };
};

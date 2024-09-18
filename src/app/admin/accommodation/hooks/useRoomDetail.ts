import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";

const fetch = async (id: number) => {
  const response = await query.get(`/room/${id}`);
  return response.data;
};

export const useDriverDetails = (id: number) => {
  const query = useQuery({
    queryKey: [`room-${id}`],
    queryFn: () => fetch(id),
    initialData: null,
    staleTime: 0,
  });

  return {
    ...query,
  };
};

import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";

const fetchDriver = async (id: number) => {
  const response = await query.get(`/driver/${id}`);
  return response.data;
};

export const useDriverDetails = (id: number) => {
  const query = useQuery({
    queryKey: [`driver-${id}`],
    queryFn: () => fetchDriver(id),
    initialData: [],
  });

  return {
    ...query,
  };
};

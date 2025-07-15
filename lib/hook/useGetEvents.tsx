import { useQuery } from "@tanstack/react-query";
import { getEnventQueryFn } from "../api";

export const useGetEvents = () => {
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: getEnventQueryFn,
  });
  const events = data?.data || [];
  return { events };
};

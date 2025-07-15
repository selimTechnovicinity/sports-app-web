import { useQuery } from "@tanstack/react-query";
import { getUserProfileQueryFn } from "../api";

export const useGetProfile = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfileQueryFn,
  });
  const userData = data?.data;
  return { userData, isLoading };
};

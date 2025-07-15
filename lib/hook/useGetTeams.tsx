import { useQuery } from "@tanstack/react-query";
import { getTeamQueryFn } from "../api";

export const useGetTeams = () => {
  const { data } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeamQueryFn,
  });
  const teams = data?.data;
  return { teams };
};

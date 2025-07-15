import { useQuery } from "@tanstack/react-query";
import { getUserTeamQueryFn } from "../api";

export const useGetUserTeams = () => {
  const { data } = useQuery({
    queryKey: ["UserTeams"],
    queryFn: getUserTeamQueryFn,
  });
  const userTeams = data?.data;
  return { userTeams };
};

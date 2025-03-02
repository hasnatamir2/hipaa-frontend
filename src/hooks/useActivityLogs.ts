import { getActivityLogsByUserId } from "@/services/activity-logs";
import { useQuery } from "@tanstack/react-query";

export const useGetActivityLogsByUserId = () => {
    return useQuery({
        queryKey: ["get-activity-logs"],
        queryFn: () => getActivityLogsByUserId(),
        retry: 1,
    });
};

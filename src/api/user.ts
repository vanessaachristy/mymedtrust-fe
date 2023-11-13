import { useQuery } from "react-query"
import axiosWithCredentials from "./fetch"

export const useFetchUserDetailQuery = () => {
    return useQuery(
        {
            queryKey: "userDetailQuery",
            queryFn: () => {
                axiosWithCredentials.get("/user").then((res) => res.data);
            },
            enabled: true
        }
    )
}
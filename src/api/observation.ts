import { useQuery } from "react-query"
import axiosWithCredentials from "./fetch"
import { Observation } from "fhir/r4"


const transformObservation = (res: any) => {
    return res.data as any[]
}
export const useGetObservationsQuery = () => {
    return useQuery(
        {
            queryKey: "getObservation",
            queryFn: async () => {
                try {
                    const response = await axiosWithCredentials.get('/record/observation/');
                    return response.data;
                } catch (error) {
                    throw new Error();
                }
            },
            select: transformObservation,
            enabled: true,
        }
    )
}
import { useQuery } from "react-query"
import axiosWithCredentials from "./fetch"


const transformObservation = (res: any) => {
    return res.data.map((d: any) => d.data) as any[];
}
export const useGetObservationsQuery = (patientAddress: string) => {
    return useQuery(
        {
            queryKey: ["getObservation", patientAddress],
            queryFn: async () => {
                try {
                    const response = await axiosWithCredentials.get(`/record/observation/patient/${patientAddress}`);
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


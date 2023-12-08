import { useQuery } from "react-query"
import axiosWithCredentials from "./fetch"

const transformCondition = (res: any) => {
    return res.data.map((d: any) => d.data) as any[];
}
export const useGetConditionQuery = (patientAddress: string) => {
    return useQuery(
        {
            queryKey: ["getCondition", patientAddress],
            queryFn: async () => {
                try {
                    const response = await axiosWithCredentials.get(`/record/condition/patient/${patientAddress}`);
                    return response.data;
                } catch (error) {
                    throw new Error();
                }
            },
            select: transformCondition,
            enabled: true,
        }
    )
}
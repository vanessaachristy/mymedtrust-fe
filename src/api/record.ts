import { useQuery } from "react-query"
import axiosWithCredentials from "./fetch"

const transformRecord = (res: any) => {
    return res.data.map((d: any) => d) as any[];
}
export const useGetRecordByPatientQuery = (patientAddress: string) => {
    return useQuery(
        {
            queryKey: ["getRecordByPatient", patientAddress],
            queryFn: async () => {
                try {
                    const response = await axiosWithCredentials.get(`/patient/record/${patientAddress}`);
                    return response.data;
                } catch (error) {
                    throw new Error();
                }
            },
            select: transformRecord,
            enabled: false,
        }
    )
}

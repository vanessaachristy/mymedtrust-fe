import { useQuery } from "react-query"
import axiosWithCredentials from "./fetch"


const transformMedication = (res: any) => {
    return res.data.map((d: any) => d.data) as any[];
}
export const useGetMedicationQuery = (patientAddress: string) => {
    return useQuery(
        {
            queryKey: ["getMedication", patientAddress],
            queryFn: async () => {
                try {
                    const response = await axiosWithCredentials.get(`/record/medication/patient/${patientAddress}`);
                    return response.data;
                } catch (error) {
                    throw new Error();
                }
            },
            select: transformMedication,
            enabled: true,
        }
    )
}



import { useQuery } from "react-query"
import axiosWithCredentials from "./fetch"


const transformAllergy = (res: any) => {
    return res.data.map((d: any) => d.data) as any[];
}
export const useGetAllergyQuery = (patientAddress: string) => {
    return useQuery(
        {
            queryKey: ["getAllergy", patientAddress],
            queryFn: async () => {
                try {
                    const response = await axiosWithCredentials.get(`/record/allergy/patient/${patientAddress}`);
                    return response.data;
                } catch (error) {
                    throw new Error();
                }
            },
            select: transformAllergy,
            enabled: true,
        }
    )
}


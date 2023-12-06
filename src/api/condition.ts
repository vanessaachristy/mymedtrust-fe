import { useQuery } from "react-query"
import axiosWithCredentials from "./fetch"

const transformCondition = (res: any) => {
    return res.data.map((d: any) => d.data) as any[];
}
export const useGetConditionQuery = () => {
    return useQuery(
        {
            queryKey: "getCondition",
            queryFn: async () => {
                try {
                    const response = await axiosWithCredentials.get('/record/condition/patient/0x8Dd02DF718aC13B7502AC421a28265aC6A9631fF');
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
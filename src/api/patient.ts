import { useQuery } from "react-query"
import axiosWithCredentials from "./fetch"


const fetchPatientList = async () => {
    try {
        const response = await axiosWithCredentials.get(`/patient/`);
        return response.data;
    } catch (error) {
        throw new Error();
    }
};

const transformPatientListQuery = (res: any) => {
    return res.data;
}

export const useFetchPatientListQuery = () => {
    return useQuery(
        ['usePatientListQuery'],
        async () => await fetchPatientList(),
        {
            select: transformPatientListQuery,
        }
    )
}

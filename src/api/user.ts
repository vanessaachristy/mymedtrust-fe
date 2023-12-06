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

const transformPatientDetails = (res: any) => {
    return res.data as any;
}

const fetchPatientDetails = async (patientAddress: string) => {
    try {
        console.log("Addresss", patientAddress)
        const response = await axiosWithCredentials.get(`/patient/${patientAddress}`);
        return response.data;
    } catch (error) {
        throw new Error();
    }
};


export const useFetchPatientDetailsQuery = (patientAddress: string) => {
    return useQuery(
        ['patientDetailQuery', patientAddress],
        async () => await fetchPatientDetails(patientAddress),
        {
            select: transformPatientDetails,
            enabled: false
        }

    );
};

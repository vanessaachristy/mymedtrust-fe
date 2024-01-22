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



const fetchRecordsList = async () => {
    try {
        const response = await axiosWithCredentials.get(`/record/id/`);
        return response.data;
    } catch (error) {
        throw new Error();
    }
};

const transformRecordsList = (res: any) => {
    return res.data?.recordsID;
}

export const useFetchRecordsList = () => {
    return useQuery(
        ['useFetchRecordsList'],
        async () => await fetchRecordsList(),
        {
            select: transformRecordsList,
        }
    )
}

const fetchRecordsDetailsList = async () => {
    try {
        const response = await axiosWithCredentials.get(`/record/`);
        return response.data;
    } catch (error) {
        throw new Error();
    }
};

const transformRecordsDetailsList = (res: any) => {
    return res.data;
}

export const useFetchRecordsDetailsList = () => {
    return useQuery(
        ['useFetchRecordsDetailsList'],
        async () => await fetchRecordsDetailsList(),
        {
            select: transformRecordsDetailsList,
        }
    )
}


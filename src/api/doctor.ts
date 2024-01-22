import { useQuery } from "react-query"
import axiosWithCredentials from "./fetch"


const fetchDoctorPatientList = async (doctorAddress: string) => {
    try {
        const response = await axiosWithCredentials.get(`/doctor/${doctorAddress}/patients`);
        return response.data;
    } catch (error) {
        throw new Error();
    }
};

const transformDoctorPatientListData = (res: any) => {
    return res.data;
}

export const useFetchDoctorPatientListQuery = (doctorAddress: string) => {
    return useQuery(
        ['useDoctorPatientListQuery', doctorAddress],
        async () => await fetchDoctorPatientList(doctorAddress),
        {
            select: transformDoctorPatientListData,
            enabled: false
        }
    )
}


const fetchDoctorList = async () => {
    try {
        const response = await axiosWithCredentials.get(`/doctor`);
        return response.data;
    } catch (error) {
        throw new Error();
    }
};

const transformDoctorList = (res: any) => {
    return res.data?.doctors;
}

export const useFetchDoctorListQuery = () => {
    return useQuery(
        ['useDoctorListQuery'],
        async () => await fetchDoctorList(),
        {
            select: transformDoctorList,
            enabled: true
        }
    )
}
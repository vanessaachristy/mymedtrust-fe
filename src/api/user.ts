import { useQuery } from "react-query"
import axiosWithCredentials from "./fetch"
import { User } from "../types";
import { UserType } from "../constants/user";

export const transformUserData = (res: any): User => {
    const userRes = res;
    const primaryInfo = res.primaryInfo;
    let user: User = {
        isLoggedIn: true,
        email: userRes.email,
        address: userRes.address,
        userType: userRes.userType,
        IC: primaryInfo.IC,
        name: primaryInfo.name,
        gender: primaryInfo.gender,
        birthdate: primaryInfo.birthdate,
        homeAddress: primaryInfo.homeAddress,
        phone: primaryInfo.phone,
        userSince: primaryInfo.userSince
    }

    if (user.userType === UserType.PATIENT) {
        user = {
            ...user,
            whitelistedDoctor: primaryInfo.whitelistedDoctor,
            recordList: primaryInfo.recordList,
            emergencyContact: res.emergencyContact,
            emergencyContactNumber: res.emergencyNumber,
            bloodType: res.bloodType,
            height: res.height,
            weight: res.weight
        }
    } else if (user.userType === UserType.DOCTOR) {
        user = {
            ...user,
            qualification: res.qualification,
            degree: res.major
        };
    }
    return user;
}

const fetchUserDetails = async () => {
    try {
        const res = await axiosWithCredentials.get("/user");
        return res.data;
    } catch (error) {
        throw new Error();
    }
}
export const useFetchUserDetailQuery = () => {
    return useQuery(
        ['userDetailQuery'],
        async () => await fetchUserDetails(),
        {
            select: transformUserData,
            enabled: false
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

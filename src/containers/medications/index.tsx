import { Heading } from "@chakra-ui/react";
import MedicationCard from "../../components/MedicationCard";
import { useGetMedicationQuery } from "../../api/medication";
import { useEffect } from "react";
import { useUserContext } from "../../model/user/userContext";
import { Medication } from "fhir/r4";
import { renderComponent } from "../../utils/renderComponent";
import { useFetchUserDetailQuery } from "../../api/user";

const Medications = () => {
  const { user, setUser } = useUserContext();
  const { data: userData, refetch: fetchUserData } = useFetchUserDetailQuery();
  useEffect(() => {
    if (!user.name && !user.IC && user.isLoggedIn) {
      fetchUserData();
    }
  }, [user, fetchUserData]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

  const {
    data: medicationsList,
    isLoading,
    isError,
    refetch: fetchMedications,
  } = useGetMedicationQuery(user?.address);

  useEffect(() => {
    if (user?.address) {
      fetchMedications();
    }
  }, [user, fetchMedications]);

  return (
    <div className="flex flex-col items-center justify-start p-6 w-full">
      <Heading color="yellow.200">Medication</Heading>
      {renderComponent({
        loading: {
          isLoading: isLoading,
        },
        error: {
          isError: isError,
          onErrorRetry: fetchMedications,
        },
        component: (
          <div className="w-[90%]">
            {medicationsList?.map((item: Medication) => {
              return <MedicationCard data={item} />;
            })}
          </div>
        ),
      })}
    </div>
  );
};

export default Medications;

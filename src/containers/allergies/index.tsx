import { Heading, Skeleton, Stack } from "@chakra-ui/react";
import AllergyCard from "../../components/AllergyCard";
import { renderComponent } from "../../utils/renderComponent";
import { useGetAllergyQuery } from "../../api/allergy";
import { useEffect } from "react";
import { useUserContext } from "../../model/user/userContext";
import { AllergyIntolerance } from "fhir/r4";
import { useFetchUserDetailQuery } from "../../api/user";

const Allergies = () => {
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
    data: allergyList,
    isLoading,
    isError,
    refetch: fetchAllergies,
  } = useGetAllergyQuery(user?.address);

  useEffect(() => {
    if (user?.address) {
      fetchAllergies();
    }
  }, [user, fetchAllergies]);

  return (
    <div className="flex flex-col items-center justify-start p-6 w-full">
      <Heading color="yellow.200" marginBottom={8}>
        Allergies
      </Heading>
      {renderComponent({
        loading: {
          isLoading: isLoading,
          style: {
            width: "80%",
          },
          component: (
            <Stack width={"100%"} spacing={4}>
              <Skeleton height="240px" />
              <Skeleton height="240px" />
              <Skeleton height="240px" />
            </Stack>
          ),
        },
        error: {
          isError: isError,
          onErrorRetry: fetchAllergies,
        },
        component: (
          <div className="w-[90%]">
            {allergyList?.map((item: AllergyIntolerance) => {
              return <AllergyCard data={item} />;
            })}
          </div>
        ),
      })}
    </div>
  );
};

export default Allergies;

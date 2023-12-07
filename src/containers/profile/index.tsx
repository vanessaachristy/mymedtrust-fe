import { useEffect } from "react";
import { useFetchUserDetailQuery } from "../../api/user";
import { useUserContext } from "../../model/user/userContext";
import {
  Avatar,
  Badge,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Spinner,
  Stack,
  Text,
  chakra,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { FaRegCopy } from "react-icons/fa";

const Profile = () => {
  const { user, setUser } = useUserContext();
  const CFaRegCopy = chakra(FaRegCopy);
  const {
    data: userData,
    refetch: fetchUserData,
    isLoading,
  } = useFetchUserDetailQuery();
  useEffect(() => {
    if (!user.name && !user.IC && user.isLoggedIn) {
      fetchUserData();
    }
  }, [user, fetchUserData]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
      setCopyAddress(userData?.address);
    }
  }, [userData, setUser]);

  const Biodata = (props: { category: string; value: any }) => {
    const { category, value } = props;
    return (
      <div className="text-sm font-semibold flex mb-2">
        <div className="text-gray-600 pr-2">{category}</div>
        {value}
      </div>
    );
  };

  const {
    onCopy,
    value: copyAddress,
    setValue: setCopyAddress,
    hasCopied,
  } = useClipboard(userData?.address ?? "");
  const toast = useToast();

  useEffect(() => {
    if (hasCopied) {
      toast({
        title: "Address copied!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  }, [hasCopied]);

  return (
    <div className="flex flex-col items-center p-6 bg-blue-950 min-h-screen">
      <Heading color="white" padding={4}>
        Profile
      </Heading>
      {isLoading ? (
        <Spinner />
      ) : (
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          width={"80vw"}
          padding={6}
        >
          <Avatar width="200px" height={"200px"} margin={6} />
          <Stack width={"100%"}>
            <CardBody>
              <Heading size="lg" marginBottom={"6"} color={"blue.600"}>
                {user?.name}
              </Heading>
              <Biodata
                category="Role"
                value={<Badge colorScheme="blue">{user?.userType}</Badge>}
              />
              <Biodata category="E-mail" value={user?.email} />
              <Biodata category="Gender" value={user?.gender} />
              <Biodata category="Birth Date" value={user?.birthdate} />
              <Biodata category="Home Address" value={user?.homeAddress} />
              <Biodata category="Phone" value={user?.phone} />
              <Divider />
              <Biodata
                category="Blockchain Address"
                value={
                  <>
                    {user?.address}{" "}
                    <CFaRegCopy
                      marginLeft={2}
                      onClick={onCopy}
                      color={"blue.400"}
                      cursor={"pointer"}
                    />
                  </>
                }
              />
              <Biodata category="User Since" value={user?.userSince} />
              {user?.emergencyContact && user?.emergencyContactNumber && (
                <div className="my-4">
                  <Heading size="md" color="blue.400">
                    Emergency Contact
                  </Heading>
                  <Biodata category="Name" value={user?.emergencyContact} />
                  <Biodata
                    category="Phone"
                    value={user?.emergencyContactNumber}
                  />
                </div>
              )}
              {user?.qualification && user?.degree && (
                <div className="my-4">
                  <Heading size="md" color="blue.400">
                    Background
                  </Heading>
                  <Biodata
                    category="Qualification"
                    value={user?.qualification}
                  />
                  <Biodata category="Degree" value={user?.degree} />
                </div>
              )}
            </CardBody>
          </Stack>
        </Card>
      )}
    </div>
  );
};

export default Profile;

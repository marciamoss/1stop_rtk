import { useEffect, useState } from "react";
import { useFetchUserQuery } from "../store";

const useCheckUser = (authUserId, userAdded) => {
  const { refetch } = useFetchUserQuery(authUserId);
  const [userInDb, setUserInDb] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const inDb = await refetch(authUserId).unwrap();
        if (authUserId && (inDb.length > 0 || userAdded)) {
          setUserInDb(true);
        } else {
          setUserInDb(false);
        }
      } catch (error) {
        setUserInDb(false);
      }
    };
    if (authUserId) {
      checkUser();
    } else {
      setUserInDb(false);
    }
  }, [refetch, authUserId, userAdded]);

  return {
    userInDb,
  };
};
export default useCheckUser;

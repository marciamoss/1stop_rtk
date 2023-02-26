import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAddUserMutation } from "../store";

const useAddUser = () => {
  const [addUser] = useAddUserMutation();

  const { authUserId, newUser } = useSelector((state) => {
    return {
      authUserId: state.authData.authUserId,
      newUser: state.userData.newUser,
    };
  });

  useEffect(() => {
    if (newUser) {
      addUser(authUserId);
    }
  }, [newUser, addUser, authUserId]);
};
export default useAddUser;

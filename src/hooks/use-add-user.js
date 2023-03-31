import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAddUserMutation } from "../store";

const useAddUser = () => {
  const [addUser] = useAddUserMutation();
  const { authUserId } = useSelector((state) => state.authData);
  const { newUser } = useSelector((state) => state.userData);

  useEffect(() => {
    if (newUser) {
      addUser(authUserId);
    }
  }, [newUser, addUser, authUserId]);
};
export default useAddUser;

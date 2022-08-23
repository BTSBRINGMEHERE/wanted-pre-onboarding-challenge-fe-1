import { useSetRecoilState } from "recoil";
import { userState } from "@/lib/atoms";

interface IuseRemoveUserStateProps {}

const useRemoveUserState = () => {
  const setUserState = useSetRecoilState(userState);

  const removeLocalStorage = () => {
    localStorage.removeItem("justdoit");
  };

  return { setUserState, removeLocalStorage };
};

export default useRemoveUserState;

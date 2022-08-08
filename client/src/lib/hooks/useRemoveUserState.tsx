import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../atoms/user";

interface IuseRemoveUserStateProps {}

const useRemoveUserState = () => {
  const setUserState = useSetRecoilState(userState);

  const removeLocalStorage = () => {
    localStorage.removeItem("justdoit");
  };

  return { setUserState, removeLocalStorage };
};

export default useRemoveUserState;

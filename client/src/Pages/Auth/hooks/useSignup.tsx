import { useMutation } from "@tanstack/react-query";
import { useFetch } from "@/lib/hooks";
import { mainUrl } from "@/lib/http";
import { AxiosError } from "axios";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@/lib/atoms";

interface SignupData {
  message: string;
  token: string;
}
interface SignupVariable {
  email: string;
  password: string;
}

const useSignup = () => {
  const { postData } = useFetch<SignupVariable, SignupData>(mainUrl.baseUrl);
  const setSnackbarQueue = useSetRecoilState(snackbarState);

  return useMutation<SignupData, AxiosError, SignupVariable, unknown>(
    (body) => postData("/users/create", body),
    {
      onSuccess: () => {
        setSnackbarQueue((pre) => [
          ...pre,
          {
            id: Date.now().toString(),
            message: "✅ 회원가입에 성공했습니다.",
            type: "notice"
          }
        ]);
      },
      onError: (error) => {
        if (error.response?.status === 400) {
          setSnackbarQueue((pre) => [
            ...pre,
            {
              id: Date.now().toString(),
              message: "⛔️ 회원가입에 실패했습니다.",
              type: "warning"
            }
          ]);
        }
      }
    }
  );
};

export default useSignup;

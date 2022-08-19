import { useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useSetUserState } from "@/Pages/Auth/hooks";
import { useRecoilState } from "recoil";
import { Snackbar } from "@/Components";
import { snackbarState } from "@/lib/atoms";
import { Routers } from "./Routes";

function App() {
  const { setUserState } = useSetUserState();
  const [snackbarQueue, setSnackbarQueue] = useRecoilState(snackbarState);

  useEffect(() => {
    const isUser = localStorage.getItem("justdoit");

    if (isUser) {
      const { isLogin, token } = JSON.parse(isUser);
      setUserState({ isLogin, token });
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => setSnackbarQueue([]), 6000);
    return () => clearTimeout(timer);
  }, [snackbarQueue]);

  return (
    <>
      <Snackbar>
        {snackbarQueue.map(({ id, message, type }) => (
          <Snackbar.Item key={id} data-set={id} message={message} type={type} />
        ))}
      </Snackbar>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routers />
    </>
  );
}

export default App;

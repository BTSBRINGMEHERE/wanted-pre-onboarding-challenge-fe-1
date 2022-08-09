import { useEffect } from "react";
import useSetUserState from "./lib/hooks/useSetUserState";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Routers from "./Routes/Routers";

function App() {
  const { setUserState } = useSetUserState();

  useEffect(() => {
    const isUser = localStorage.getItem("justdoit");

    if (isUser) {
      const { isLogin, token } = JSON.parse(isUser);
      setUserState({ isLogin, token });
    }
  }, []);

  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routers />
    </>
  );
}

export default App;

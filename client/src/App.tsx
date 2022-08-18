import { useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useSetUserState } from "@/lib/hooks";
import { Routers } from "@/Routes";

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

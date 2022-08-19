import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { MainLayout } from "@/Layouts";
import { userState } from "@/lib/atoms";
import {
  Login,
  Logout,
  PageNotFound,
  SignUp,
  Main,
  ToDoDetailContainer
} from "@/Pages";
import { ProtectRouter } from "@/Routes";

const Routers = () => {
  const { isLogin } = useRecoilValue(userState);
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          element={
            <ProtectRouter isAllow={isLogin} redirectPath={"/auth/login"} />
          }
        >
          <Route path="" element={<Main />}>
            <Route path=":todoId" element={<ToDoDetailContainer />} />
          </Route>
        </Route>
        <Route
          element={<ProtectRouter isAllow={!isLogin} redirectPath={"/"} />}
        >
          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Route>
      </Route>
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Routers;

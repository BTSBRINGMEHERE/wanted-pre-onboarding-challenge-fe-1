import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import MainLayout from "../Layouts/MainLayout";
import { userState } from "../lib/atoms/user";
import Login from "../Pages/Auth/Login";
import Logout from "../Pages/Auth/Logout";
import PageNotFound from "../Pages/Auth/PageNotFound";
import SignUp from "../Pages/Auth/SignUp";
import Main from "../Pages/Main/Main";
import ToDoDetail from "../Pages/TODO/Detail/ToDoDetailContainer";
import ProtectRouter from "./ProtectRouter";

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
          <Route path="/" element={<Main />}>
            <Route path=":todoId" element={<ToDoDetail />} />
          </Route>
          <Route path="/logout" element={<Logout />} />
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
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Routers;

import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import MainLayout from "../Layouts/MainLayout";
import { userState } from "../lib/atoms/user";
import Login from "../Pages/Auth/Login";
import Logout from "../Pages/Auth/Logout";
import PageNotFound from "../Pages/Auth/PageNotFound";
import SignUp from "../Pages/Auth/SignUp";
import Main from "../Pages/Main/Main";

const Routers = () => {
  const { isLogin } = useRecoilValue(userState);
  return (
    <Routes>
      {isLogin && <Route path="/logout" element={<Logout />} />}
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="auth">
          {!isLogin && (
            <>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </>
          )}
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Routers;

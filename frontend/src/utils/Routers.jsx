import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import Home from "../page/Home";
import LoginPage from "../components/Authentication/LoginPage";
import SignUpPage from "../components/Authentication/SignUpPage";
import Test from "../components/Problem/Test";
import ChangePasswordPage from "../components/Authentication/ChangePasswordPage";
import ForgotPasswordPage from "../components/Authentication/ForgotPasswordPage";


const Routers = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  // console.log("authUser :", authUser);
  // console.log("checkAuth :", checkAuth);
  // console.log("isCheckingAuth :", isCheckingAuth);

  useEffect(() => {
    // Only check auth if it's not already loaded,  if you always want to check once per load ki user ke pas token hai aa nhi mtlb login hai aa nhi.
    checkAuth();
  }, []);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/problem-section"
          element={authUser ? <Test /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/signin"
          element={
            !authUser ? <LoginPage /> : <Navigate to={"/problem-section"} />
          }
        />
        <Route
          path="/signup"
          element={
            !authUser ? <SignUpPage /> : <Navigate to={"/problem-section"} />
          }
        />
        <Route
          path="/change-password"
          element={
            <ChangePasswordPage/>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ForgotPasswordPage/>
          }
        />
      </Routes>
    </div>
  );
};

export default Routers;

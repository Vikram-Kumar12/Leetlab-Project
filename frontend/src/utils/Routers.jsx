import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import Home from "../page/Home";
import LoginPage from "../components/Authentication/LoginPage";
import SignUpPage from "../components/Authentication/SignUpPage";
import ChangePasswordPage from "../components/Authentication/ChangePasswordPage";
import ForgotPasswordPage from "../components/Authentication/ForgotPasswordPage";
import Layout from "../components/Layout/Layout";
import ProblemHomePage from "../components/Problem/ProblemHomePage";
import AdminRoute from "../components/Layout/AdminRoute";
import AddProblem from "../components/Problem/AddProblem";
import ProblemPageById from "../components/Problem/ProblemPageById";

const Routers = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  // console.log("authUser :", authUser);
  // console.log("checkAuth :", checkAuth);
  // console.log("isCheckingAuth :", isCheckingAuth);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (token) {
    checkAuth();
    // }
  }, []);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen text-black">
        <Loader className="size-80 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/problem-section" element={<Layout />}>
          <Route
            index
            element={
              authUser ? <ProblemHomePage /> : <Navigate to={"/signin"} />
            }
          />
        </Route>

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
          path="/problem/:id"
          element={authUser ? <ProblemPageById /> : <Navigate to={"/signin"} />}
        />

        <Route element={<AdminRoute />}>
          <Route
            path="/add-problem"
            element={authUser ? <AddProblem /> : <Navigate to="/" />}
          />
        </Route>

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
      </Routes>
    </div>
  );
};

export default Routers;

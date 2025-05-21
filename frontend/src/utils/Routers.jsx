import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../page/Home";
import LoginPage from "../components/Authentication/LoginPage"
import SignUpPage from "../components/Authentication/SignUpPage"
const Routers = () => {
  return (
    <div>
      <Routes>
        {/* <Route path='/' element={authUser ? <HomePage/> : <Navigate to={"/login"}/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to={"/"}/>}/>
        <Route path='/signup' element={!authUser ? <SignUpPage/> : <Navigate to={"/"}/>}/> */}
        <Route
          path="/"
          element={<Home/>}
        />
        <Route
          path="/signin"
          element={<LoginPage/>}
        />
        <Route
          path="/signup"
          element={<SignUpPage/>}
        />

      </Routes>
    </div>
  );
};

export default Routers;

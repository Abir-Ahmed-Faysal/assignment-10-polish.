import React, { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user,isLoading } = useContext(AuthContext);
  const location = useLocation();
if(isLoading){
     return <div className="text-center mt-10">Loading...</div>;
}
  if (!user || !user.email) {
    return <Navigate to={"/logIn"} state={location.pathname}></Navigate>;
  }


  return <div>{children}</div>;
};

export default PrivateRoute;

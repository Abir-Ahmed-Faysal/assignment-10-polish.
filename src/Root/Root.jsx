import React, { useContext } from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router";
import AuthContext from "../Context/AuthContext";
 import { ToastContainer } from 'react-toastify';

const Root = () => {
  const { isLoading } = useContext(AuthContext);

  return (
    <>
      {isLoading ? (
        <div className="absolute top-[50%] text-secondary left-[50%]">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <>
         <ToastContainer />
          <Header></Header>
          <div className="">
            <Outlet></Outlet>
          </div>
          <Footer></Footer>
        </>
      )}
    </>
  );
};

export default Root;

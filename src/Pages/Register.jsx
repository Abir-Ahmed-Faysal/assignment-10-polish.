import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import AuthContext from "../Context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signUpWithEmail, userInfoUpdate, getUpdateUser, googleSignIn } =
    useContext(AuthContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  const targetPath = state ? state : "/";

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage("");
    const form = e.target;
    const data = new FormData(form);
    const formData = Object.fromEntries(data);

    const { username, email, photoUrl, password } = formData;
    if (!username || !email || !photoUrl || !password) {
      alert("All fields are required");
      return;
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!password) {
      alert("Please enter password");
      return;
    } else if (!regex.test(password)) {
      setErrorMessage(
        "Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    signUpWithEmail(email, password)
      .then(() => {
        userInfoUpdate(username, photoUrl)
          .then(() => {
            getUpdateUser();
            navigate(targetPath);
          })

          .catch((error) => toast.error(error.message));
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          alert("please enter an valid email");
        } else {
          console.log(error);
        }
      });
  };

  const handleGoogleSignUp = () => {
    googleSignIn()
      .then(() => {
      
        toast.success("google sign Up successfully");
        navigate(targetPath);
      })
      .catch((error) => toast.error(error));
  };

  return (
    <div className="w-full max-w-md my-5 mx-auto p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800">
      <h1 className="text-2xl font-bold text-center">Register</h1>
      <form onSubmit={handleRegister} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-teal-600"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label className="block text-gray-600">Email</label>
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="user email"
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-teal-600"
          />
        </div>{" "}
        <div className="space-y-1 text-sm">
          <label className="block text-gray-600">photo URL</label>
          <input
            type="text"
            name="photoUrl"
            id="photoUrl"
            placeholder="photo URL"
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-teal-600"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-teal-600"
          />
          <div className="flex justify-end text-xs text-gray-600">
            <a rel="noopener noreferrer" >
              Forgot Password?
            </a>
          </div>
        </div>
        {errorMessage && <div className="text-warning">{errorMessage}</div>}
        <button className="block w-full p-3 text-center rounded-sm text-gray-50 bg-teal-600">
          Register
        </button>
      </form>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
        <p className="px-3 text-sm text-gray-600">
          Register with social accounts
        </p>
        <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleGoogleSignUp}
          aria-label="Log in with Google"
          className="p-3 rounded-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-5 h-5 fill-current"
          >
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
        </button>
      </div>
      <p className="text-xs text-center sm:px-6 text-gray-600">
        already have an account?
        <Link to={"/logIn"} className="underline text-gray-800">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;

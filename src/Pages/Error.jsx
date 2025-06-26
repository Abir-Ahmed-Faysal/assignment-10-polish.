import React from "react";

const Error = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-base-100 text-center px-4">
      <img 
        src="https://i.ibb.co/8LFHx6xP/Error-page.gif" 
        alt="Error Illustration"
        className="w-80 h-80 mb-6"
      />
      <h1 className="text-4xl font-bold text-error">Oops! Page Not Found</h1>
      <p className="text-lg text-gray-500 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/" className="btn btn-error mt-6">
        Go Back Home
      </a>
    </div>
  );
};

export default Error;

import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const { data, status } = useRouteError();

  return (
    <div className="w-screen min-h-screen flex justify-center items-center font-bold text-4xl">
      {data}
      <p>{status}</p>
    </div>
  );
};

export default ErrorPage;

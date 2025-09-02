import React, { useContext, useRef, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  const { user } = useContext(AuthContext);
  const toastShownRef = useRef(false);

  useEffect(() => {
    return () => {
      toastShownRef.current = false;
    };
  }, []);

  if (!user) {
    if (!toastShownRef.current) {
      toast.info("You have to login first.");
      toastShownRef.current = true;
    }
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
};

export default Private;

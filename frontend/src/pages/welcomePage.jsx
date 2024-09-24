import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginPage } from "./loginPage";
import { SignUpPage } from "./signUpPage";
import { RegisterPage } from "./registrationPage";
import { HostPage } from "./host";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const WelcomePage = () => {
  const navigate = useNavigate();
  const customGray = "#252525";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [viewLogin, setViewLogin] = useState(false);
  const [viewSignup, setViewSignup] = useState(false);
  const [viewJoin, setViewJoin] = useState(false);
  const [viewHost, setViewHost] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (viewLogin) {
    return <LoginPage />;
  }

  if (viewSignup) {
    return <SignUpPage />;
  }

  if (viewJoin) {
    return <RegisterPage />;
  }

  if (viewHost) {
    return <HostPage />;
  }

  if (!authChecked) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center bg-black text-white">
      <h1 className="text-4xl leading-tight mb-0">
        Safe, secure and quick registrations.
        <br />
        <span className="opacity-50 inline-block">
          now possible thanks to "hehe"
        </span>
      </h1>
      <p className="italic mt-2 text-xs">
        Take part in all the events you want to,
        <br />
        without having to <span className="underline">worry</span> about
        hundreds of passes.
      </p>

      <div className="mt-4">
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => {
                setViewLogin(true);
              }}
              style={{ backgroundColor: customGray }}
              className="mx-4 text-1.5xl h-10 w-36 border-2 border-black rounded-md font-serif">
              Login
            </button>
            <button
              onClick={() => {
                setViewSignup(true);
              }}
              className="mx-4 text-1.5xl h-10 w-36 bg-black border-2 border-custom-gray rounded-md font-serif">
              SignUp
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setViewHost(true);
              }}
              style={{ backgroundColor: customGray }}
              className="mx-4 text-1.5xl h-10 w-36 border-2 border-black rounded-md font-serif">
              Host
            </button>
            <button
              onClick={() => {
                setViewJoin(true);
              }}
              className="mx-4 text-1.5xl h-10 w-36 bg-black border-2 border-custom-gray rounded-md font-serif">
              Join
            </button>
          </>
        )}
      </div>
    </div>
  );
};

import React from "react";
import { useUserContext } from "../../services/user-context";
import MainView from "./home";
import SignInSide from "./signin/dashboard";

export const Landing = () => {
  const { user } = useUserContext();
  return user ? <MainView /> : <SignInSide />;
};

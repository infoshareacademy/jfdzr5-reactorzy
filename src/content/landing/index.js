import React from "react";
import { useUserContext } from "../../services/user-context";
import MainView from "./home";
import SignInSide from "./signin/dashboard";
import Loading from "../../common/loading";

export const Landing = () => {
  const { user, isLoading } = useUserContext();

  return isLoading ? <Loading /> : user ? <MainView /> : <SignInSide />;
};

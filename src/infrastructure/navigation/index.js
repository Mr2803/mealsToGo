import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";
import { AuthContext } from "../../services/auth/auth.context";

export const Navigation = () => {
  const { isAuth } = useContext(AuthContext);
  // console.log(isAuth);
  return (
    <NavigationContainer>
      {isAuth ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

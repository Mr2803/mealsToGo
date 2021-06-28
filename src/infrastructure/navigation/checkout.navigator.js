import React from "react";
import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";
import { SuccessScreen } from "../../features/checkout/screens/success.screen";
import { ErrorScreen } from "../../features/checkout/screens/error.screen";
import { createStackNavigator } from "@react-navigation/stack";

const CheckoutStack = createStackNavigator();

export const CheckoutNavigator = () => {
  return (
    <CheckoutStack.Navigator headerMode="none">
      <CheckoutStack.Screen
        options={{ header: () => null }}
        name="Checkout"
        component={CheckoutScreen}
      />
      <CheckoutStack.Screen
        options={{ header: () => null }}
        name="Success"
        component={SuccessScreen}
      />
      <CheckoutStack.Screen
        options={{ header: () => null }}
        name="Error"
        component={ErrorScreen}
      />
    </CheckoutStack.Navigator>
  );
};

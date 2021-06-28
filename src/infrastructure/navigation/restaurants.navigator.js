import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { RestaurantScreen } from "../../features/restaurants/screens/restaurant.screen";
import { RestaurantDetailsScreen } from "../../features/restaurants/screens/restaurantDetails.screen";
const RestaurantStack = createStackNavigator();

export const RestaurantNavigator = () => {
  return (
    <RestaurantStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <RestaurantStack.Screen name="Ristoranti" component={RestaurantScreen} />
      <RestaurantStack.Screen
        name="DettagliRistorante"
        component={RestaurantDetailsScreen}
      />
    </RestaurantStack.Navigator>
  );
};

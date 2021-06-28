import React from "react";
import { RestaurantNavigator } from "./restaurants.navigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MapScreen } from "../../features/map/screens/map.screen";
import { CheckoutNavigator } from "./checkout.navigator";
import { SettingsNavigator } from "./settings.navigator";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { CartContextProvider } from "../../services/cart/cart.context";
const Tab = createBottomTabNavigator();
const TAB_ICON = {
  Ristoranti: "md-restaurant",
  Mappa: "md-map",
  Impostazioni: "md-settings",
  Carrello: "md-cart",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>
        <CartContextProvider>
          <Tab.Navigator
            screenOptions={createScreenOptions}
            tabBarOptions={{
              activeTintColor: "tomato",
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="Ristoranti" component={RestaurantNavigator} />
            <Tab.Screen name="Carrello" component={CheckoutNavigator} />
            <Tab.Screen name="Mappa" component={MapScreen} />
            <Tab.Screen name="Impostazioni" component={SettingsNavigator} />
          </Tab.Navigator>
        </CartContextProvider>
      </RestaurantsContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);

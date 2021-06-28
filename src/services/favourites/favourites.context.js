import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../services/auth/auth.context";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [favourites, setFavourites] = useState([]);

  const saveFavourites = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const loadFavourites = async (uid) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@favourites-${uid}`);
      return jsonValue != null ? setFavourites(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log("error loading", e);
    }
  };

  const add = (restaurant) => {
    setFavourites([...favourites, restaurant]);
  };

  const remove = (restaurant) => {
    const newFavourites = favourites.filter(
      (x) => x.placeId !== restaurant.placeId
    );
    setFavourites(newFavourites);
  };

  useEffect(() => {
    if (user) {
      loadFavourites(user.uid);
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      saveFavourites(favourites, user.uid);
    }
  }, [favourites, user]);
  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites: add, removeFromFavourites: remove }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth/auth.context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [total, setTotal] = useState(0);

  const saveCart = async (rst, crt, uid) => {
    try {
      const jsonValue = JSON.stringify({ restaurant: rst, cart: crt });
      await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
    } catch (e) {
      console.log("errore nel salvataggio SAVE", e);
    }
  };

  const loadCart = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@cart-${uid}`);
      if (value !== null) {
        const { restaurant: rst, cart: crt } = JSON.parse(value);
        setRestaurant(rst);
        setCart(crt);
      }
    } catch (e) {
      console.log("errore nel salvataggio LOAD", e);
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      loadCart(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid) {
      saveCart(restaurant, cart, user.uid);
    }
  }, [restaurant, cart, user]);

  useEffect(() => {
    if (!cart.length) {
      setTotal(0);
      return;
    }
    const newTotal = cart.reduce((acc, { price }) => {
      return (acc += price);
    }, 0);
    setTotal(newTotal / 100);
  }, [cart]);

  const add = (item, risto) => {
    if (!restaurant || restaurant.placeId !== risto.placeId) {
      setRestaurant(risto);

      setCart([item]);
    } else {
      setCart([...cart, item]);
    }
  };

  const clear = () => {
    setCart([]);
    setRestaurant(null);
  };
  return (
    <CartContext.Provider
      value={{ addToCart: add, clearCart: clear, restaurant, cart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

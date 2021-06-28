import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { List, Divider } from "react-native-paper";
import { CreditCardForm } from "../components/credit-card.component";
import { CartContext } from "../../../services/cart/cart.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import {
  CartIconContainer,
  CartIcon,
  NameInput,
  PayButton,
  ClearButton,
  PaymentProcessing,
} from "../components/checkout.styles";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";
import { paymentRequest } from "../../../services/checkout/checkout.service";

export const CheckoutScreen = ({ navigation }) => {
  const { cart, restaurant, total, clearCart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const onPayment = () => {
    setIsLoading(true);
    if (!card || !card.id) {
      setIsLoading(false);
      navigation.navigate("Error", {
        error: "Inserisci un metodo di pagamento valido",
      });
      return;
    }

    paymentRequest(card.id, total * 100, name)
      .then((result) => {
        setIsLoading(false);
        clearCart();
        navigation.navigate("Success");
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
        navigation.navigate("Error", {
          error: e,
        });
      });
  };

  if (!cart.length || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon bg="orange" icon="cart-off" />
          <Text>Il tuo carrello è vuoto !</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }
  console.log(cart);
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      {isLoading && <PaymentProcessing />}
      <ScrollView>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="large">
            <Text>Il tuo ordine</Text>
          </Spacer>
          <List.Section>
            {cart.map(({ item, price }, index) => {
              // console.log("QUESTO é ITEM ========>", item);
              return (
                <List.Item
                  key={`item-${index}`}
                  title={`${item.toUpperCase()} - € ${price / 100}`}
                />
              );
            })}
          </List.Section>
          <Text>Totale Ordine : € {total}</Text>
        </Spacer>
        <Spacer position="top" size="large" />
        <Divider />
        <NameInput
          label="Name"
          value={name}
          onChangeText={(t) => {
            setName(t);
          }}
        />
        <Spacer position="top" size="large">
          {name.length > 0 && (
            <CreditCardForm
              name={name}
              onSuccess={setCard}
              onError={() =>
                navigation.navigate("Error", {
                  error: "Qualcosa è andato storto nel tentativo di pagamento",
                })
              }
            />
          )}
        </Spacer>
        <Spacer position="top" size="xxl" />
        <PayButton
          disabled={isLoading}
          icon="cash-usd"
          mode="contained"
          onPress={() => {
            onPayment();
          }}
        >
          Paga Ora
        </PayButton>
        <Spacer position="top" size="large" />
        <ClearButton
          disabled={isLoading}
          onPress={clearCart}
          icon="cart-off"
          mode="contained"
        >
          Svuota carta
        </ClearButton>
        <Spacer position="top" size="xl" />
      </ScrollView>
    </SafeArea>
  );
};

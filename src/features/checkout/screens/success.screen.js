import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { CartIconContainer, CartIcon } from "../components/checkout.styles";

export const SuccessScreen = () => {
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="check-bold" />
        <Text variant="label">Pagamento effettuato con successo !</Text>
      </CartIconContainer>
    </SafeArea>
  );
};

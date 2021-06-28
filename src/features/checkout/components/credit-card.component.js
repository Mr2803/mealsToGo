import React from "react";
import {
  LiteCreditCardInput,
  CreditCardInput,
} from "react-native-credit-card-input";

import { cardTokenRequest } from "../../../services/checkout/checkout.service";

//

export const CreditCardForm = ({ name, onSuccess, onError }) => {
  const onChange = async (formData) => {
    const { values, status } = formData;

    const isIncomplete = Object.values(status).includes("incomplete");
    console.log(isIncomplete);
    const expiry = values.expiry.split("/");

    const card = {
      number: values.number,
      exp_month: expiry[0],
      exp_year: expiry[1],
      cvc: values.cvc,
      name: name,
    };
    if (!isIncomplete) {
      try {
        const token = await cardTokenRequest(card);
        onSuccess(token);
      } catch (error) {
        onError();
      }
    }
  };
  return <CreditCardInput onChange={onChange} />;
};

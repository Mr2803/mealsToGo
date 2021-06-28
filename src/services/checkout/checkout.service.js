import createStripe from "stripe-client";
import { host } from "../../utils/env";
const stripe = createStripe(
  "pk_test_51HFx8EAKZ8pFMQyCH1DABUZsaF0zQPPjOIxyXBczvloNNbyHZp4eRqUIwy7kAVGOs2soUyHa0gBPE4TQY8bYVIWT00j6T1V8Rz"
);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const paymentRequest = (token, amount, name) => {
  console.log(host);
  return fetch(`${host}/payment`, {
    body: JSON.stringify({
      token,
      amount,
      name,
    }),
    method: "POST",
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject("something went wrong processing your payment");
    }
    return res.json();
  });
};

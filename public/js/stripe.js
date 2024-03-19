const stripe = Stripe("Connection-String");
import axios from "axios";

export const payments = async function () {
  const session = await axios("http://127.0.0.1:9000/checkout/payments");

  await stripe.redirectTocheckout({
    sessionId: session.data.session.id,
  });
};

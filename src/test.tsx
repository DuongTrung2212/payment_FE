import React, { useState, useEffect } from "react";
import { Appearance, StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./App.css";
import CheckoutForm from "./Checkout";
import Cookies from "universal-cookie";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8000/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => {
        const cookie= new Cookies();
        cookie.set('clientSecret',data.clientSecret);
        setClientSecret(data.clientSecret)
      });
  }, []);

  const appearance:Appearance = {
    theme: 'stripe',
  };
  const options:StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
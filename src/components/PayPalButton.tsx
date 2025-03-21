'use client';

import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
  amount: string;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess, onError }) => {
  // Inicializar las opciones de PayPal
  const initialOptions = {
    clientId: "AU_8xVFcuBU2vbx_wWgSJLbXwNLZ_4-fVgSXXtYdW8Ij5lhQEGMdkU8CjHxBDZF85UpX9jnTbqtMHSH2",
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{ layout: "vertical", shape: "rect" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
                description: "PhotoHero Custom AI Model",
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          if (actions.order) {
            const details = await actions.order.capture();
            console.log("Payment completed successfully:", details);
            onSuccess(details);
          }
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;

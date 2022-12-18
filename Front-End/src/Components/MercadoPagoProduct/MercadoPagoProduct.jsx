import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import axios from 'axios'

const FORM_ID = 'payment-form';

export default function MercadoPagoProduct({ items }) {

  const cart = useSelector(state => state.cart)
  const [preferenceId, setPreferenceId] = useState(null);
  console.log(cart)

  useEffect(() => {
    if (!preferenceId && cart) {
      // luego de montarse el componente, le pedimos al backend el preferenceId
      console.log("requesting preferenceid")
      axios.post(`http://localhost:3001/create_preference`, { items: cart }).then((order) => {

        console.log(`received! ${order.data.id}`)
        setPreferenceId(order.data.id);
        // const script = document.createElement('script');
        // script.type = 'text/javascript';
        // script.src =
        //   'https://www.mercadopago.cl/integrations/v1/web-payment-checkout.js';
        // script.setAttribute('data-preference-id', preferenceId);
        // const form = document.getElementById(FORM_ID);
        // form.appendChild(script);
        const mp = new window.MercadoPago('TEST-959bcbcb-0bd9-475f-b5af-0349fcbf5bc8', {
          locale: 'es-AR'
        });

        mp.checkout({
          preference: {
            id: order.data.id
          },
          render: {
            container: '.cho-container',
            label: 'Pagar',
          }
        });
      });
    }
  }, [preferenceId, cart]);

  return (
    <div className='cho-container' />
  );
}
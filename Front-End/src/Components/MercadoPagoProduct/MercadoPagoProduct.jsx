import React, { useEffect, /* useState */ } from 'react';
import { useSelector } from 'react-redux';
/* import axios from 'axios'; */

/* import { useAuth0 } from "@auth0/auth0-react"; */

// const FORM_ID = 'payment-form';
/* const BACKEND_SERVER =
  process.env.REACT_APP_BACKEND_SERVER || "http://localhost:3001"; */

export default function MercadoPagoProduct({ items }) {

  const cart = useSelector(state => state.cart)
  //const [preferenceId, setPreferenceId] = useState(null);
  const preference = useSelector(state => state.preference)
/*   const { user } = useAuth0(); */

  useEffect(() => {
    if (preference && cart) {
      // luego de montarse el componente, le pedimos al backend el preferenceId
      //console.log("requesting preferenceid")
      //axios.post(`${BACKEND_SERVER}/create_preference`, { items: cart, email: user.email }).then((order) => {

        console.log(`received! ${preference}`)
       // setPreferenceId(order.data.id);
        
        const mp = new window.MercadoPago('TEST-959bcbcb-0bd9-475f-b5af-0349fcbf5bc8', {
          locale: 'es-AR'
        });

        mp.checkout({
          preference: {
            id: preference
          },
          render: {
            container: '.cho-container',
            label: 'Pagar',
          }
        });
      //});

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preference, cart]);

  return (
    <div className='cho-container' />
  );
}
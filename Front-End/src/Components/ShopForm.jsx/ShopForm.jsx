import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import MercadoPagoProduct from '../MercadoPagoProduct/MercadoPagoProduct';
import s from '../ShopForm.jsx/ShopForm.module.css'


export const ShopForm = () => {

    const inicialState = {
        name: '',
        lastname: '',
        phone: '',
        email: '',
        street: '',
        number: '',
        ciudad: '',
        provincia: '',
        CP: ''
    }

    const [input, setInput] = useState(inicialState);
    const [pagar, setPagar] = useState(false);



    const onChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        setPagar(true)
    }
    console.log("Rendering ShopForm");
    return (

        <div className={s.container}>
            <h2 className="h2">Datos del comprador</h2>

            <div className='card' style={{ width: "40rem", left: "22rem", top: "2rem" }}>

                <div class="form-group">
                    <label>Nombres: </label>
                    <input
                        type='text'
                        name='name'
                        class="form-control"
                        placeholder='*Required data'
                        value={input.name}
                        onChange={(e) => onChange(e)} />
                    <br />

                    <label>Apellidos: </label>
                    <input
                        type='text'
                        name='lastname'
                        class="form-control"
                        placeholder='*Required data'
                        value={input.lastname}
                        onChange={(e) => onChange(e)} />
                    <br />

                    <label>Número de Teléfono: </label>
                    <input
                        type='text'
                        name='phone'
                        class="form-control"
                        placeholder='*Required data'
                        value={input.phone}
                        onChange={(e) => onChange(e)} />
                    <br />

                    <label>E-mail: </label>
                    <input
                        type="email"
                        class="form-control"
                        name='email'
                        placeholder='*Required data'
                        value={input.email}
                        onChange={(e) => onChange(e)} />
                    <br />

                    <label>Calle: </label>
                    <input
                        type='text'
                        name='street'
                        class="form-control"
                        placeholder='*Required data'
                        value={input.street}
                        onChange={(e) => onChange(e)} />
                    <br />

                    <label>Nº de casa: </label>
                    <input
                        type='text'
                        name='number'
                        class="form-control"
                        placeholder='*Required data'
                        value={input.number}
                        onChange={(e) => onChange(e)} />
                    <br />

                    <label>Provincia: </label>
                    <input
                        type='text'
                        name='provincia'
                        class="form-control"
                        placeholder='*Required data'
                        value={input.provincia}
                        onChange={(e) => onChange(e)} />
                    <br />

                    <label>Ciudad: </label>
                    <input
                        type='text'
                        name='ciudad'
                        class="form-control"
                        placeholder='*Required data'
                        value={input.ciudad}
                        onChange={(e) => onChange(e)} />
                    <br />

                    <label>Código Postal: </label>
                    <input
                        type='text'
                        name='CP'
                        class="form-control"
                        placeholder='*Required data'
                        value={input.CP}
                        onChange={(e) => onChange(e)} />
                    <br />

                    <input
                        onClick={handlerSubmit}
                        class="btn btn-primary"
                        value='Solicitar Pago'
                    />
                    {(pagar) ? null : <MercadoPagoProduct items={input} />}
                </div>
            </div>
        </div>
    )
}

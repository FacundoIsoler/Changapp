import React from 'react'
import { useForm } from 'react-hook-form'
import s from './Contact.module.css'


export const Contact = () => {
  const {register, handleSubmit, formState: {errors}} = useForm()



  const  onSubmit = (data) => {
    console.log(data)
  }
console.log(useForm())

  return (
    <div className={s.container}>
      <h2 className="h2">Contactenos</h2>   
    
    <div className='card' style={{maxWidth:"40rem", background: "rgb(159, 158, 158)", border: "transparent"}}>
     
     <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
  <div className="col-md-6">
    <label for="inputEmail4" className="form-label">Email*</label>
    <input type="email" className="form-control" id="inputEmail4" {...register("email",  { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },)}/>
    {errors.email && <span className={s.error}>Este campo es obligatorio</span>}
  </div>
  <div className="col-md-6">
    <label for="inputName" className="form-label">Nombre y apellido*</label>
    <input type="text" className="form-control" id="inputName" {...register("name",  { required: true })}></input>
    {errors.name && <span className={s.error}>Este campo es obligatorio</span>}
  </div>
  <div className="col-12">
    <label for="inputPhone" className="form-label">Teléfono</label>
    <input type="number" className="form-control" id="inputPhone" placeholder="" {...register("tel", { required: true, pattern: /^[0-9]\d*(\.\d+)?$/} )}></input>
    {errors.tel?.type === 'required' && <span className={s.error}>Este campo es obligatorio</span>}
    {errors.tel?.type === 'pattern' && <span className={s.error}>Este campo solo acepta números</span>}
  </div>
  <div className="col-12">
    <label for="inputAddress2" className="form-label">Dirección</label>
    <input type="text" className="form-control" id="inputAddress2" placeholder="" {...register("adress")}></input>
  </div>
  <div className="col-12">
    <label for="inputCity" className="form-label">Ciudad</label>
    <input type="text" className="form-control" id="inputCity" {...register("city")}></input>
  </div>
  <div className="col-12">
    <label for="inputComment" className="form-label">Tu consulta*</label>
    <textarea type="textarea" className="form-control" id="inputComment" {...register("comment", { required: true})}></textarea>
  </div>
   
  <span>Los campos con  * son obligatorios</span>
   <div className="col-12">
    <button type="submit" className="btn btn-primary">Enviar</button>
  </div>


</form>


    </div>

  
    </div>
  )
}

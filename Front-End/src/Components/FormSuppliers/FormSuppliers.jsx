import React from 'react'
import s from './FormSuppliers.module.css'
import { useDispatch } from 'react-redux'
import { postSupplier } from '../../actions'
import { useNavigate } from "react-router-dom";

export const FormSuppliers = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch()
  const [finished, setFinished] = React.useState(false)


  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [ finished ]);



  const { register, handleSubmit, formState: { errors } } = useForm()
 
  const [form, setForm] = React.useState({
    name: "",
    cuit: "",
    eMail: "",
    phoneNumber: "",
    adress: "",
    location: "",
    description: "",

  }
  )

  const onSubmit = (data) => {

    const imageForm = document.getElementById('supplier');
    const formData = new FormData(imageForm);
    data.cuit = Number(data.cuit)
    data.phoneNumber = Number(data.phoneNumber)

    dispatch(postSupplier(formData))
    setFinished(true)
    setTimeout(() => {
      if (!errors.name && !errors.cuit && !errors.eMail && !errors.phoneNumber && !errors.adress && !errors.location && !errors.description) {
        navigate('/')
      }
    }, 3000);
   
   
    
  }
  

  return (
    <div  className={s.container}>

      {    
      finished === false
      ?
      <div><h1>Inscribí a tu empresa</h1>
      
            <div className="s.Form" style={{ maxWidth: "40rem"}}>
      
            <form onSubmit={handleSubmit(onSubmit)} className="row g-3" enctype="multipart/form-data" id='supplier'>
      
                <div className="col-md-6">
                  <label for="inputName" className="form-label">Nombre de la empresa</label>
                  <input name='name' type="text" className="form-control" id="inputName" placeholder='Tu Empresa' {...register("name", {
                    required: true, onChange: e => {
                      setForm({
                        ...form,
                        name: e.target.value
                      })
                    }
                  })}></input>
                  {(errors.name || form.name.length < 1) && <span className={s.error}>Este campo es obligatorio</span>}
                </div>
      
                <div className="col-md-6">
                  <label for="inputCuit" className="form-label">CUIT</label>
                  <input type="text" className="form-control" id="inputCuit" placeholder="xxxxxxxxxxx" {...register("cuit", {
                    required: true, onChange: e => {
                      setForm({
                        ...form,
                        cuit: e.target.value
                      })
                    }, minLength: 10, maxLength: 11, pattern: /^\d+$/i
                  })}></input>
                  {(errors.cuit?.type === 'required' || form.cuit.length < 1) && <span className={s.error}>Este campo es obligatorio</span>}
                  {errors.cuit?.type === 'pattern' && <span className={s.error}>Solo se permiten números</span>}
                  {(errors.cuit?.type === 'minLength' || (form.cuit.length < 10 && form.cuit.length > 0)) && <span className={s.error}>El mínimo es de 10 caracteres</span>}
                  {(errors.cuit?.type === 'maxLength' || form.cuit.length > 13) && <span className={s.error}>El máximo es de 11 caracteres</span>}
                </div>
                <div className="col-md-6">
                  <label for="inputEmail4" className="form-label">Email</label>
                  <input type="email" className="form-control" id="inputEmail4" placeholder='xxxxxx@mail.com' {...register("eMail", {
                    required: true, onChange: e => {
                      setForm({
                        ...form,
                        eMail: e.target.value
                      })
                    }, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  },)} />
                  {(errors.eMail || form.eMail.length < 1) && <span className={s.error}>Este campo es obligatorio</span>}
                </div>
                <div className="col-md-6">
                  <label for="inputPhone" className="form-label">Teléfono</label>
                  <input type="number" className="form-control" id="inputPhone" placeholder="Tu teléfono" {...register("phoneNumber", {
                    required: true, onChange: e => {
                      setForm({
                        ...form,
                        phoneNumber: e.target.value
                      })
                    }, pattern: /^[0-9]\d*(\.\d+)?$/
                  })}></input>
                  {(errors.phoneNumber?.type === 'required' || form.phoneNumber.length < 1) && <span className={s.error}>Este campo es obligatorio</span>}
                  {errors.phoneNumber?.type === 'pattern' && <span className={s.error}>Solo se permiten números</span>}
                </div>
                <div className="col-12">
                  <label for="inputAddress2" className="form-label">Dirección</label>
                  <input type="text" className="form-control" id="inputAddress2" placeholder="Dirección de la empresa" {...register("adress", {
                    required: true, onChange: e => {
                      setForm({
                        ...form,
                        adress: e.target.value
                      })
                    }
                  })}></input>
                  {errors.adress && <span className={s.error}>Este campo es obligatorio</span>}
                </div>
                <div className="col-12">
                  <label for="inputCity" className="form-label">Ciudad</label>
                  <input type="text" className="form-control" id="inputCity" placeholder='Ciudad sede de la empresa' {...register("location", {
                    required: true, onChange: e => {
                      setForm({
                        ...form,
                        location: e.target.value
                      })
                    }
                  })}></input>
                  {errors.location && <span className={s.error}>Este campo es obligatorio</span>}
                </div>
      
                <div className="col-12">
                  <label for="inputDescription" className="form-label">Descripción del servicio</label>
                  <input type="text" className="form-control" id="inputDescription" placeholder="Breve descripción del servicio" {...register("description", {
                    required: true, onChange: e => {
                      setForm({
                        ...form,
                        description: e.target.value
                      })
                    }
                  })}></input>
                  {errors.description && <span className={s.error}>Este campo es obligatorio</span>}
                </div>
      
                <div className="col-12">
                  <label for="inputDescription" className="form-label">Logo de la empresa</label>
                  <input class="form-control form-control-sm" id="formFileSm" type="file" name='image' />
                </div>
      
                <div className="col-md-12">
                  <button type="submit" className="btn btn-primary" style={{background:"rgb(52, 51, 51)"}}>Enviar</button>
                </div>
      
      
              </form>
      
      
            </div>
      
      
          </div>
          :
          <div className={`alert alert-success ${s.msgAlert} `} role="alert">
          <h4 className="alert-heading">¡Su solicitud se ha enviado con éxito!</h4>
          <p>A continuación será redirigido a la página de inicio. Por favor tenga paciencia-</p>
          <hr/>
          <p className="mb-0">Cualquier inquietud, no dude en ponerse en contacto con nosotros</p>
        </div>
        }
    </div>
  )
}
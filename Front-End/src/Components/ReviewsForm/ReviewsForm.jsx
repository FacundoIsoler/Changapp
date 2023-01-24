
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import s from '../ReviewsForm/ReviewsForm.module.css';
import { sendReview } from '../../actions';
import { useParams } from 'react-router-dom';

export default function ReviewsPost ({canReview}) {

  const supplierDetails = useSelector(state => state.supplierDetails)
  const services = supplierDetails.Services

  const selectOptions = [];
  canReview.forEach( contract => {
    services.forEach( service => {
      if(service.SupplierService.id === contract.SupplierServiceId){
        selectOptions.push([service, contract])
      }
    })
  })

 /*  console.log(selectOptions, "OPTIONS")
  
  console.log(canReview, "Reviews")
  console.log(userId, "ID") */
  
  const dispatch = useDispatch()
  
  const supplierId = useParams()
  console.log(supplierId.id, "PARAMS")
  
  const [inputValues, setInputValues] = useState({
    rating: 1,
    comment: "",
    serviceId: 0,
    contractId: 0
    //Aun hardcodeado
  })

  console.log(selectOptions, "SO")
  
  console.log(inputValues)
  /* console.log(supplierId) */

  const inputHandlers = (e) => {
    setInputValues( prev => {
      return {
        ...prev,
        [e.target.name]: e.target.name === "comment" ? e.target.value : parseInt(e.target.value)
      }
    })
  }

  const selectHandler = (e, options) => {
    const search = options.find( element => element[1].id === parseInt(e.target.value))
    console.log(search[0].SupplierService.ServiceId, "SEARCH")
    if(e.target.value === "default"){
      setInputValues( prev => {
        return {
          ...prev,
          serviceId: 0,
          contractId: 0
        }
      })
    }else {
      setInputValues( prev => {
        return {
          ...prev,
          serviceId: search[0].SupplierService.ServiceId,
          contractId: parseInt(e.target.value)
        }
      })
    }
  }

  return (

    <form className={s.container}>

   
        <div className={s.services}>

            <h5>Servicio</h5>
            <select onChange={(e) => selectHandler(e, selectOptions)}>

            <option value='default'>-- Seleccione el servicio... --</option>

            {selectOptions.length > 0 ? selectOptions.map( element => {
              
              return <option value={element[1].id}>{element[0].serviceType}</option>

            }) : null}

            </select>
        </div>
    

      <h5 className={s.title}>Puntuación</h5>
      
      <div className={s.rating}>
        
        <input name="rating" value={inputValues.rating} 
        type="range" 
        min="1" max="5"
        onChange={(e) => inputHandlers(e)}/>

        <div className={s.numeric}>
          <label>1</label><label>2</label><label>3</label><label>4</label><label>5</label>
        </div>

      </div>
<div className={s.column}>
      <h6>Comentario</h6>
      <textarea rows="3" cols='80' className={s.textArea} placeholder='Deja tu comentario aqui...' name="comment" value={inputValues.comment} onChange={(e) => {
        inputHandlers(e);
      }} maxLength="256"/>

      <input className={s.submit} disabled={inputValues.serviceType === "" ? true : false}
        type="submit" value="Enviar" onClick={(e) => {
        e.preventDefault();
        dispatch(sendReview(inputValues))
        setInputValues(prev => {
          return {
            ...prev,
            rating: 1,
            comment: "",
            contractId: 0,
            serviceId: 0
          }
        })
       }}/></div>
    </form>
  )

}
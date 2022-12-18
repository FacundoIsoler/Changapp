import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServices } from '../../actions'
import s from './Services.module.css'



import { ServicesCard } from '../ServicesCard/ServicesCard'


export const Services = () => {
  let dispatch = useDispatch()
  let services = useSelector((state) =>state.services )

  React.useEffect(
    ()=>{
   
        dispatch(getServices())        
          


      }, [dispatch])

  const servicesMap = services.map((service) => { 
   
    return <ServicesCard
    name={service.serviceType} price={service.pricePerHour} description={service.description} id={service.CategoryId} img={service.representative_image} />})

  return (
    <div className={s.contenedor}>
{servicesMap}

    </div>
  )
}


for (let index = 0; index < array.length; index++) {
  const element = array[index];
  
}
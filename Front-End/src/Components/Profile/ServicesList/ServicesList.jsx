
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import s from "./ServicesList.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "../../Index/Index.jsx";

export default function ServicesList () {

  const {user} = useAuth0();
  const allServices = useSelector(state => state.allServices);
  const allContracts = useSelector(state => state.contracts);

  const [currentPage, setCurrentPage] = useState(1);
  let myServices = [];

  useEffect( () => {
    setCurrentPage(1);
  },[allServices])

  const index = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  if(user.user_role === "Admin" || user.user_role === "SuperAdmin"){
    myServices = allServices
  }else{
    
    console.log(typeof allServices[0].Suppliers.SupplierService.id, "element")
      const myContracts = allContracts.filter( contract => contract.User.id === parseInt(user.id)); //Busca los contratos que ha hecho el usuario
      const contractsSupplierId = myContracts.map( contract => contract.SupplierServiceId); //Busca el id del SupplierService de los contratos del usuario
      contractsSupplierId.forEach( service => {             //Compara los los contractSupplierId con cada servicio para obtener los servicios contratados por el usuario
        const aux = allServices.find( element => {
          return element.Suppliers.SupplierService.id === parseInt(service)
        })
        return myServices = [...myServices, aux]
      })
  }

  //PAginacion
  //Variables de paginacion
  const servicesPerPage = 5;
  let indexOfLastService = currentPage * servicesPerPage;
  let indexofFirstService = indexOfLastService - servicesPerPage;
  const currentServices = myServices.slice(   
    indexofFirstService,
    indexOfLastService
    );
  //paginacion

  return(
    <div>
      {user.user_role === "Admin" ||
      user.user_role === "SuperAdmin" ?
      <h3>Lista de servicios</h3> :
      <h3>Lista de servicios contratados</h3>}

        {myServices.length > 0 ?
        <Index
        servicesPerPage={servicesPerPage}
        allServices={myServices.length}
        index={index}
        currentPage={currentPage}/>: null}
    
      {/* Poner Solo admin: */}
      <div className={s.container}>

        {myServices ? currentServices.map( element => {
              return <Link to={"/services/" + element.id}><div className={s.card}>
          <div>
              <b>Id: </b><span>{element.id}</span>
            </div>
            <div>
              <b>Tipo de servicio: </b><span>{element.serviceType}</span>
            </div>
            <div>
              <b>Categoría: </b><span>{element.Category.name}</span>
            </div>
          </div></Link>
        }): null}

      </div>
    </div>
  )
}
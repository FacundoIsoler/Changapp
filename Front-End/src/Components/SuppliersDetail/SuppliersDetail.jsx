import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { authSupplier, getDetails, getUserDetails} from "../../actions";
import { useAuth0 } from "@auth0/auth0-react";

import style from "../SuppliersDetail/SuppliersDetail.module.css"
import ReviewsForm from '../ReviewsForm/ReviewsForm.jsx'


export const SuppliersDetail = () => {
  let dispatch = useDispatch();
  let supplierDetail = useSelector((state) => state.supplierDetails);
  let params = useParams();

  const navigate = useNavigate();
  
  const { user, isAuthenticated } = useAuth0();
  const userLog = useSelector(state => state.userLog);
  let role, userId = null;
  const userDetails = useSelector(state => state.userDetails)

  React.useEffect(() => {
    dispatch(getDetails(params.id));
    if(userId) dispatch(getUserDetails(userId))
  }, [dispatch, params.id, userId]);
  
  let allContracts = [];
  if(user) allContracts = userDetails[0].Contracts

  if(user) {
    role = user.user_role || userLog;
    userId = user.id
  }




let servs=supplierDetail.Services
/* console.log(servs) */
const canReview = allContracts.filter( userContract => userContract.SupplierId === supplierDetail.id)
/* allContracts.forEach( userContract => {
  supplierDetail.Contracts.forEach( supplierContract =>{
    if(supplierContract.SupplerServiceId === userContract.SupplierServiceId){
      canReview.push(userContract)
    }
  })
}) */

  return (
    <div className={style.background}>
      {/* <img src="https://img.freepik.com/vector-gratis/fondo-blanco-engranajes-espacio-texto_1017-19420.jpg?w=740&t=st=1670717357~exp=1670717957~hmac=f21d56057b8eb5931d14fd0d376c7116e6c0ee7255c798c2ccc4b61e86ade88c" alt='background'/> */}
      <div className={style.card_container}>
      <div class={style.detail_container}>

        <input type="button" className={style.goBack} onClick={() => navigate(-1)}></input>

        <div className={style.container}>
          <img src={supplierDetail.logo} alt='logo'  width='100px' heigth='100px'/>
          <h1 className={style.title}>{supplierDetail.name}</h1>
        </div>
        <div className={style.flex}>
          <div className={style.textFlex}>
            <h6>Cuit: {supplierDetail.cuit}</h6>
            <p>{supplierDetail.description}</p>

          </div>
          {role === "Admin" || role === "SuperAdmin" ? <div className={style.adminButton}>
            <label>Autorizado: <b className={supplierDetail.isAuthorized ? style.authorized : style.noAuthorized}>
              {supplierDetail.isAuthorized ? "SI" : "NO"}</b>
            </label>
            <button className={style.button} onClick={() => {
              dispatch(authSupplier(supplierDetail.id, supplierDetail.isAuthorized ? false : true))
            }}>Autorizar</button>
          </div> : null}
        </div>
<h4>Servicios prestados</h4>
        {
servs?.map( (s, index)=>{

  return (
  
    <div>
           <a className={`btn btn-primary, ${style.botonfiltros}`} data-bs-toggle="offcanvas" href={`#offcanvasExample${index}`} role="button" aria-controls="offcanvasExample" >
           {s.serviceType}
            </a>
     
            <div className={`offcanvas offcanvas-start, ${style.slideNav}`} tabindex="-1" id={`offcanvasExample${index}`} >
                <button type="button" className={style.closeButton} data-bs-dismiss="offcanvas" >X</button>
                
               <ul><h4>Reviews</h4>
                  {s.Reviews?.map(r => {
                    return (
                      <div className={style.reviews}>
                        {/*<p>comentario de {r.UserId}</p>*/}
                        <p>rating: {r.rating}</p>
                        <p>{r.comment}</p>
                      </div>
                    )
                  })}
                </ul>  
                </div>
    </div>
  )
})
        } 
        </div>
        
      </div>

      { isAuthenticated && canReview.length > 0 ? <ReviewsForm canReview={canReview} /* userId={userId} *//> : null}
     
      
      
    </div>
  );
};


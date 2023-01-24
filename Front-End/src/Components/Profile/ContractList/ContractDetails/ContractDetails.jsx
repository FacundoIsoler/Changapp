
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getContractDetails, updateContractStatus } from '../../../../actions';
import { useNavigate } from "react-router-dom";
import s from './ContractDetails.module.css';

export default function ContractDetails () {

  const dispatch = useDispatch();
  const contract = useSelector(state => state.contractDetails)
  const params = useParams();

  let data = {
    date: contract.date, 
    SupplierServiceId: contract.SupplierServiceId, 
    amount: contract.amount, 
    UserId: contract.UserId, 
    status: contract.status
  };

  useEffect( ( ) => {
      dispatch(getContractDetails(params.id))
  },[dispatch, params.id])

  const navigate = useNavigate();

  const onClick = (e) => {
    console.log(e.target.value)
    data = {
      ...data,
     status: e.target.value
    }
  };

  const handlerOnClick = (e) => {
    dispatch(updateContractStatus(params.id,data));
  };

  useEffect(()=>{

  },[contract]);

  return (
    <div className={s.container}>
      <div className={s.divv}>
        <div className={s.buttons}>
          <input
          type="button"
          onClick={() => navigate(-1)}
          value='Back'
        />
          <h3>Contrato # {contract.id}</h3>
          <p><b>Estado: </b>{contract.status}</p>
          <p><b>Actualizar</b></p>
          <select onClick={(e)=>onClick(e)}>
            <option>CREADA</option>
            <option>PROCESADA</option>
            <option>COMPLETADA</option>
            <option>CANCELADA</option>
          </select>
<input className={s.buttons} type="button" value="Guardar" onClick={(e)=>handlerOnClick(e)}/>
        </div>
        <div className={s.text}>
          <p><b>Fecha: </b> {contract.date}</p>
          { contract.User ? <p><b>Cliente: </b>{contract.User.userName}</p> : null}
          { contract.Supplier ? <p><b>Proveedor: </b>{contract.Supplier.name}</p> : null}
        </div>
        <div className={s.reviews}>
          <h5>Review</h5>
          {/* <p><b>Puntiación</b>{contract.Review.rating}</p> */}
          <p><b>Comentario</b>{contract.commmet}</p>
        </div>
      </div>
    </div>
  )
}
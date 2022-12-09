/* export const TEST = "TEST"

export function test(){
    return {
        type: TEST,
        payload: "salio ok"
    }
} */

import { json } from "react-router-dom"
import { ADD_CART, GET_DETAILS, REMOVE_ITEM } from "../Constantes/Constantes"
import axios from 'axios';


//import {Servicios} from '../Mockup/Servicios.js';

export function setServices(payload){
    return {
        type: "SET_SERVICES",
        payload
    }
}

export function init () {
    return function(dispatch){
        fetch('http://localhost:3001/services')
            .then(res => res.json())
            .then(res => {
                dispatch(setServices(res))
                dispatch(addServices(res))
            })
    }
}

export function getCategories() {
    return function (dispatch) {

        fetch('http://localhost:3001/category')
            .then(res => res.json())
            .then(res => dispatch({ type: "GET_CATEGORIES", payload: res }))
    }
}

export function getLocations(){
    return function(dispatch){
        fetch('http://localhost:3001/location')
        .then( res => res.json())
        .then( res => dispatch({type: "GET_LOCATIONS", payload: res}))
        /* .then( res => {
            console.log(res, "LOCATION")
           // dispatch({type: "GET_LOCATIONS", payload:})
            
        }) */
    }
}
export function filterByCategory(categoryId) {
    return function (dispatch) {

        fetch(`http://localhost:3001/services?by=category&category=${categoryId}`)
            .then(res => res.json())
            .then(res => dispatch({ type: "FILTER_BY_CATEGORY", payload: res }))
    }
}
export function filterByLocation(location) {
    return function (dispatch) {

        fetch(`http://localhost:3001/services?by=location&location=${location}`)
            .then(res => res.json())
      //      .then(res => console.log(res, "REPUESTA"))
            .then(res => dispatch({ type: "FILTER_BY_LOCATION", payload: res }))
    }
}

export function getServices() {
    return function (dispatch) {
        /* var json =  Servicios
         return dispatch({
            type: 'GET_SERVICES',
            payload: json
        }) */
        //FALTA UN LOADER
        fetch('http://localhost:3001/services')
            .then(res => res.json())
            .then(res => dispatch(addServices(res)))
    }
}

export function addServices(payload) {
    return {
        type: 'ADD_SERVICES',
        payload
    }
}

export function searchService(data) {
    return function (dispatch) {
        fetch(`http://localhost:3001/services?type=${data}`)
            .then(res => res.json())
            .then(res => dispatch(addServices(res)))
        dispatch(searchingTrue());
    }
}

export function searchingTrue() {
    return {
        type: 'SEARCHING_TRUE'
    }
}

export function searchingFalse() {
    return {
        type: 'SEARCHING_FALSE'
    }
}

export function fillSuppliers(payload) {
    return {
        type: 'FILL_SUPPLIERS',
        payload
    }
}

export function getSuppliers() {
    return function (dispatch) {
        fetch('http://localhost:3001/suppliers')
            .then(res => res.json())
            .then(res => dispatch(fillSuppliers(res)))
    }
}

export function searchSuppliers(data) {
    return function (dispatch) {
        fetch(`http://localhost:3001/suppliers?name=${data}`)
            .then(res => res.json())
            .then(res => dispatch(fillSuppliers(res)))
        dispatch(searchingTrue());
    }
}

export function searchingServices() {
    return {
        type: 'SEARCHING_SERVICES'
    }
}

export function searchingSuppliers() {
    return {
        type: 'SEARCHING_SUPPLIERS'
    }
}


export const getDetails = (id) => {
    let found;
    return function (dispatch) {
        fetch('http://localhost:3001/suppliers')
            .then(res => res.json())
            .then(res => found = res.find(e => e.id === (id)))
            .then(res => {
                console.log(res)
                dispatch({
                    type: GET_DETAILS,
                    payload: found
                })

            })



    }

}


export const addCart = (id) => {
    let found;
    return function (dispatch) {
        fetch('http://localhost:3001/services')
            .then(res => res.json())
            .then(res => found = res.find(e => e.id === (id)))
            .then(res => {
                console.log(found)
                dispatch({
                    type: ADD_CART,
                    payload: found
                })

            })

    }
}

// http://localhost:3000/services?filter=Limpieza%20de%20Hoteles,Limpieza%20de%20Hogares&order=ASC
export function orderByPrices(data, filter){
    return function(dispatch){
        fetch(`http://localhost:3001/services?order=${data}&filter=${filter}`)
        .then( res => res.json())
        .then( res => dispatch(addServices(res)))
    }
}

export function getServiceDetails(data){
    return function(dispatch){
        fetch(`http://localhost:3001/services/${data}`)
        .then( res => res.json())
        .then( res => dispatch({type: "SERVICE_DETAIL", payload: res}))
    }
}

export const removeItem = (id) => {
    return{
        type: REMOVE_ITEM,
        payload: id
    }
   


}

export const postSupplier = (payload) => {

    return function() {
       axios.post('http://localhost:3001/suppliers', {
        adress: payload.adress,
        cuit: payload.cuit,
        description: payload.description,
        eMail: payload.eMail,
        location: payload.location,
        name: payload.name,
        phoneNumber: payload.phoneNumber
      }
     
      )            
      .catch((error) => {
       console.log(error)
        alert("Something went wrong...")
      })
     
    }
    
  }
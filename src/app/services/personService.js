import axios from "axios";
import { urlBase } from "../../helpers/config";

export const getList = (params) =>{
  const data = axios.get(`${urlBase}person/`,{params});
  return data
}


export const createPerson = (person,address,location) =>{

  const data = axios.post(`${urlBase}person/`, {
    person,
    address,
    location,
  })

  return data
}
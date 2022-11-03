import axios from "axios";
import { urlBase } from "../../helpers/config";

export const createAccessHour = (access) =>{
  const data = axios.post(`${urlBase}access/`,access)
  return data
} 

export const getListAccess = (idPoint) =>{
  const data = axios.get(`${urlBase}access/?idPoint=${idPoint}`)
  return data
}


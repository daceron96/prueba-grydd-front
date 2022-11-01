import axios from "axios";
import { urlBase } from "../../helpers/config";

export const createAccessHour = async (access) =>{
  const data = await axios.post(`${urlBase}access/`,access)
  return data
} 
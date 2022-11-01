import axios from "axios";
import { urlBase } from "../../helpers/config";


export const login = async (credentials) => {
  const { data } = await axios.post(`${urlBase}login/`, credentials);
  return data;
};


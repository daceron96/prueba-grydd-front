import axios from "axios";
import { urlBase } from "../../helpers/config";

export const getCompanyList = () => {
  const data = axios.get(`${urlBase}company`);
  return data;
};

export const createCompany = (company, address, location) => {
  const data = axios.post(`${urlBase}company/`, {company, address, location});
  return data
};

export const getPointCompanyList = (params) => {
  const data = axios.get(`${urlBase}point/`, { params });
  return data;
};


export const createPointCompany = (address,point) =>{
  const data = axios.post(`${urlBase}point/`,{
    address,
    point
  })
  return data
}
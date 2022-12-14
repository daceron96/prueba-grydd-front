import axios from "axios";


export const urlBase = "http://192.168.0.15:8000/api/";

export const setAuthToken = (token,role) => {

  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } 
};


export const logOut = () =>{

  delete axios.defaults.headers.common["Authorization"];
  localStorage.removeItem("token");
  // localStorage.removeItem("user");
  
}
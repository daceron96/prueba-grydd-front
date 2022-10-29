import React, { useEffect, useState } from "react";
import CardDetail from "../../company/CardDetail";
import { urlBase,logOut } from "../../../helpers/config";
import {setLogin} from '../../../app/slices/userSlice'
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";

export default function CompnayList() {
  const [companyList, setCompanyList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {login, user} =  useSelector((state) => state.user);

  useEffect(() => {
    if(login){
      axios.get(`${urlBase}company`)
        .then((response) => {
          setCompanyList(response.data);
        })
        .catch(response => {
          console.log(response)
          logOut()
          dispatch(setLogin(false))
          navigate('/login')

        });
    }else{
      navigate('/login')
    }
    
  }, []);

  const handleCreate = () => {
    navigate('/company/create')
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-10">
          <h2>Lista de empresas</h2>
        </div>
        {user === 'admin' &&
          <div className="col-md-2">
            <button className="btn btn-primary" onClick={() => handleCreate()}>Registrar empresa</button>
          </div>
        }
      </div>
      <hr />
      <div className="row mt-4">
        {user === 'admin'? 
          companyList.map((detail, index) => {
            return <CardDetail key={index} detail={detail} />;
          })
          :
          <h6>No cuentas con los permisos para realizar esta accion</h6>
        }
        
      </div>
    </div>
  );
}

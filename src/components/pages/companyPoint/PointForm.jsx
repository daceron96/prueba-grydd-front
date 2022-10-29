import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from 'react';

import Form from '../../company_point/Form';
export default function PointForm() {

  const params = useParams();
  const {login, user} =  useSelector((state) => state.user);
  const navigate = useNavigate()
  useEffect(() => {
    console.log(login)
    if(!login){
      navigate('/login')
    }
  }, []);
  
  return (
    <div className="container">
      <div className="row mt-3 mx-auto">
        <div className="card">
          <div className="card-body">
            <h5>Registro de nuevo punto de acceso</h5>
            <hr />
            <Form company={params.nit} />
          </div>
        </div>
      </div>
    </div>
  );
}

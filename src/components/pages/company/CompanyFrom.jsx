import Form from '../../company/Form';
import {useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux";
import { useEffect } from 'react';

export default function CompanyForm() {
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
            <h5>Registrar nueva compañia</h5>
            <hr />
            {user === 'admin'? 
              <Form />
              :
              <h6>No cuentas con los permisos para realizar esta accion</h6>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

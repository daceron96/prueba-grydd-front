import React, { useState } from "react";
import axios from "axios";
import { urlBase, setAuthToken } from "../../helpers/config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDataUser, setLogin } from "../../app/slices/userSlice";
import {login} from '../../app/services/authService'


export default function Login() {
  //dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //useStates
  const [data, setData] = useState({});
  const [error, setError] = useState({});

  const handleLogin = async (event) =>{
    event.preventDefault()
    try{
      const user = await login(data)
      dispatch(setLogin(true))
      setAuthToken(user.token)
      localStorage.setItem(
        'user', JSON.stringify(user.user)
      )
      dispatch(setDataUser(user.user))
      navigate('/company/list')
    }
    catch({response}){
      setError(response.data)
    }
  }

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row col-12 col-md-7 mx-auto">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mt-3">Inicio de sesión</h5>
                <form className="mt-4" onSubmit={handleLogin} >
                  <div className="form-floating  mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Número de documento"
                      onChange={(e) =>
                        setData({ ...data, username: e.target.value })
                      }
                    />
                    <label>Número de documento</label>
                  </div>
                  <div className="form-floating  mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Contraseña"
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                    />
                    <label>Contraseña</label>
                  </div>
                  {error.error && (
                    <div className="alert alert-danger" role="alert">
                      {error.error}
                    </div>
                  )}
                  <div className="d-grid gap-2 mx-auto">
                    <button
                      type="submit"
                      className="btn btn-primary mb-4"
                      // onClick={() => handleLogin}
                    >
                      Iniciar sesión
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

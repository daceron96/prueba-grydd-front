import React, { useState } from "react";
import axios from "axios";
import { urlBase, setAuthToken } from "../../helpers/config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDataUser, setLogin } from "../../app/slices/userSlice";

export default function Login() {
  //dispatch
  const dispatch = useDispatch();
  const navitate = useNavigate();
  //useStates
  const [data, setData] = useState({});
  const [error, setError] = useState({});

  const handleSubmit = () => {
    const login = async () => {
      await axios
        .post(`${urlBase}login/`, data)
        .then((response) => {
          const { token, user } = response.data;
          setAuthToken(token, user.role);
          dispatch(setDataUser(user.role));
          dispatch(setLogin(true));

          if(user.role === 'admin'){
            navitate('/company/list')
          }

        })
        .catch((response) => {
          console.log(response);
          setError({ message: response.response.data.error });
        });
    };

    login();
  };

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row col-12 col-md-7 mx-auto">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mt-3">Inicio de sesión</h5>
                <form className="mt-4">
                  <div className="form-floating  mb-3">
                    <input
                      type="email"
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
                  {error.message && (
                    <div className="alert alert-danger" role="alert">
                      {error.message}
                    </div>
                  )}
                  <div className="d-grid gap-2 mx-auto">
                    <button
                      type="button"
                      className="btn btn-primary mb-4"
                      onClick={() => handleSubmit()}
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

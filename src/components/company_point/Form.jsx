import React, { useState } from "react";
import Error from "../helpers/Error";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { urlBase } from "../../helpers/config";

export default function Form({company}) {
  const [errors, setErrors] = useState({});
  const [point, setPoint] = useState({ company: company });
  const [address, setAddress] = useState({});
  const navigate = useNavigate()
  const errorStyle = () => {
    return `is-invalid`;
  };
  const handleSubmit = (e) => {
    const createCompany = async () => {
      await axios
        .post(`${urlBase}point/`, {
          address,
          point,
        })
        .then((response) => {
          navigate(`/company/point/list/${company}`)
        })
        .catch((response) => {
          console.log(response.response.data);
          setErrors({ ...response.response.data });
        });
    };

    createCompany();
  };
  return (
    <form className="mt-3 row g-3">
      <h6>Datos de acceso</h6>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="text"
            className={`form-control ${errors.name && errorStyle()}`}
            placeholder="Nombre"
            onChange={(e) => setPoint({ ...point, name: e.target.value })}
          />
          <label>Nombre</label>
          {errors.name && <Error message={errors.name[0]} />}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="email"
            className={`form-control ${errors.email && errorStyle()}`}
            placeholder="Correo electronico"
            onChange={(e) => setPoint({ ...point, email: e.target.value })}
          />
          <label>Correo electronico </label>
          {errors.email && <Error message={errors.email[0]} />}
        </div>
      </div>
      {/* Datos de dirrecion */}
      <hr />
      <h6>Datos de dirección</h6>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="text"
            className={`form-control ${errors.street && errorStyle()}`}
            placeholder="Calle - Carrera"
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
          />
          <label>Calle - Carrera </label>
          {errors.street && <Error message={errors.street[0]} />}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="text"
            className={`form-control ${errors.number && errorStyle()}`}
            placeholder="Número"
            onChange={(e) => setAddress({ ...address, number: e.target.value })}
          />
          <label>Número </label>
          {errors.number && <Error message={errors.number[0]} />}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="text"
            className={`form-control ${errors.district && errorStyle()}`}
            placeholder="Barrio - Apartamento"
            onChange={(e) =>
              setAddress({ ...address, district: e.target.value })
            }
          />
          <label>Barrio - Apartamento </label>
          {errors.district && <Error message={errors.district[0]} />}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="text"
            className={`form-control ${errors.postalCode && errorStyle()}`}
            placeholder="Código postal"
            onChange={(e) =>
              setAddress({ ...address, postalCode: e.target.value })
            }
          />
          <label>Código postal </label>
          {errors.postalCode && <Error message={errors.postalCode[0]} />}
        </div>
      </div>
      <hr />
      <div className="d-grid gap-2 col-3 mx-auto">
        <button
          type="button"
          className="btn btn-primary mb-4"
          onClick={() => handleSubmit()}
        >
          Registrar informacion
        </button>
      </div>
    </form>
  );
}

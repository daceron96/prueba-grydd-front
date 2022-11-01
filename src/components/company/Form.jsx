import React, { useState } from "react";
import { urlBase } from "../../helpers/config";
import axios from "axios";
import Error from "../helpers/Error";
import {createCompany} from '../../app/services/companyService';

export default function Form( {handleView, handleAddCompnay}) {
  const [errors, setErrors] = useState({});
  const [company, setCompany] = useState({});
  const [address, setAddress] = useState({});
  const [location, setLocation] = useState({});
  const errorStyle = () => {
    return `is-invalid`;
  };

  const handleSubmit = (e) => {
    const sendData = async () => {
      try{
        const {data} = await createCompany(company,address,location)
        handleAddCompnay(data)
        handleView('list')
      }catch(error){
        console.log(error.response.data)
        setErrors(error.response.data)
      }
    };

    sendData();
  };

  return (
    <form className="row g-3">
      {/* Datos de empresa */}
      <h6>Datos de la empresa</h6>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="text"
            className={`form-control ${errors.nit && errorStyle()}`}
            placeholder="Nit de la empresa"
            onChange={(e) => setCompany({ ...company, nit: e.target.value })}
          />
          <label>Nit de la empresa</label>
          {errors.nit && <Error message={errors.nit[0]} />}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="text"
            className={`form-control ${errors.companyName && errorStyle()}`}
            placeholder="Nombre de la empresa"
            onChange={(e) =>
              setCompany({ ...company, companyName: e.target.value })
            }
          />
          <label>Nombre de la empresa</label>
          {errors.companyName && <Error message={errors.companyName[0]} />}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="text"
            className={`form-control ${errors.tradeName && errorStyle()}`}
            placeholder="Nombre comercial de la empresa "
            onChange={(e) =>
              setCompany({ ...company, tradeName: e.target.value })
            }
          />
          <label>Nombre comercial de la empresa </label>
          {errors.tradeName && <Error message={errors.tradeName[0]} />}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="text"
            className={`form-control ${errors.phone && errorStyle()}`}
            placeholder="Telefono"
            onChange={(e) => setCompany({ ...company, phone: e.target.value })}
          />
          <label>Telefono </label>
          {errors.phone && <Error message={errors.phone[0]} />}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="email"
            className={`form-control ${errors.email && errorStyle()}`}
            placeholder="Correo electronico"
            onChange={(e) => setCompany({ ...company, email: e.target.value })}
          />
          <label>Correo electronico </label>
          {errors.email && <Error message={errors.email[0]} />}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="text"
            className={`form-control ${errors.webSite && errorStyle()}`}
            placeholder="Sitio web"
            onChange={(e) =>
              setCompany({ ...company, webSite: e.target.value })
            }
          />
          <label>Sitio web </label>
          {errors.webSite && <Error message={errors.webSite[0]} />}
        </div>
      </div>
      <div className="row mt-4 mb-3">
        <label className="col-sm-2 col-form-label">Logo de la empresa</label>
        <div className="col-sm-10">
          <input
            className={`form-control ${errors.icon && errorStyle()}`}
            type="file"
            accept="image/jpeg,image/png,image/"
            onChange={(e) => setCompany({ ...company, icon: e.target.value })}
          />
          {errors.icon && <Error message={errors.icon[0]} />}
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
      {/* Datos de pais-estado-ciudad */}
      <hr />
      <h6>Datos de ubicación</h6>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="text"
            className={`form-control ${errors.country && errorStyle()}`}
            placeholder="País"
            onChange={(e) =>
              setLocation({ ...location, country: e.target.value })
            }
          />
          <label>País </label>
          {errors.country && <Error message={errors.country[0]} />}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="text"
            className={`form-control ${errors.department && errorStyle()}`}
            placeholder="Departamento"
            onChange={(e) =>
              setLocation({ ...location, department: e.target.value })
            }
          />
          <label>Departamento </label>
          {errors.department && <Error message={errors.department[0]} />}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="text"
            className={`form-control ${errors.city && errorStyle()}`}
            placeholder="Ciudad"
            onChange={(e) => setLocation({ ...location, city: e.target.value })}
          />
          <label>Ciudad </label>
          {errors.city && <Error message={errors.city[0]} />}
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

import React, { useEffect, useState } from "react";
import Error from "../helpers/Error";
import {createPerson} from '../../app/services/personService';
import {getPointCompanyList} from '../../app/services/companyService';
import {getListAccess} from '../../app/services/accessHourService';
import { useParams } from "react-router-dom";

const Form = ({handleView, handleAddPerson}) => {
  const params = useParams();
  const [errors, setErrors] = useState({});
  const [person, setPerson] = useState({});
  const [address, setAddress] = useState({});
  const [location, setLocation] = useState({});
  const [points, setPoints] = useState([]);
  const [access, setAccess] = useState([]);

  const errorStyle = () => {
    return `is-invalid`;
  };

  useEffect(() => {
    const getList = async() =>{
      try{
        const {data} = await getPointCompanyList(params)
        setPoints([...data])
      }catch(error){
        console.log(error);
      }
    }
    getList()
  }, []);

  useEffect(() => {
    
    const getList = async() =>{
      
        const {data} = await getListAccess(person.companyPoint)
        setAccess([...data])
    }
    if(person.companyPoint !== undefined && person.companyPoint !== 'undefined'){
      getList()
    }else{
      setAccess([])
      setPerson({...person, accessHour : undefined})
    }

  }, [person.companyPoint]);

  const handleSubmit = (e) => {
    const sendData = async() =>{
      try{
        const {data} = await createPerson(person,address,location)
        handleAddPerson(data)
        handleView('list')
      }catch(error){
        console.log(error);
        setErrors(error.response.data)
      }
    }

    sendData();
  };

  return (
    <div>
      <form className="mt-3 row g-3">
        {/* Datos de usuario */}
        <h6>Datos de usuario</h6>
        <div className="col-md-6">
          <div className="form-floating ">
            <input
              type="text"
              className={`form-control ${errors.identifier && errorStyle()}`}
              placeholder="Número de documento"
              onChange={(e) =>
                setPerson({ ...person, identifier: e.target.value })
              }
            />
            <label>Número de documento </label>
            {errors.identifier && <Error message={errors.identifier[0]} />}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating ">
            <input
              type="text"
              className={`form-control ${errors.names && errorStyle()}`}
              placeholder="Nombres"
              onChange={(e) => setPerson({ ...person, names: e.target.value })}
            />
            <label>Nombres </label>
            {errors.names && <Error message={errors.names[0]} />}
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-floating ">
            <input
              type="text"
              className={`form-control ${errors.surNames && errorStyle()}`}
              placeholder="Apellidos"
              onChange={(e) =>
                setPerson({ ...person, surNames: e.target.value })
              }
            />
            <label>Apellidos </label>
            {errors.surNames && <Error message={errors.surNames[0]} />}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating ">
            <input
              type="text"
              className={`form-control ${errors.phone && errorStyle()}`}
              placeholder="Telefono"
              onChange={(e) => setPerson({ ...person, phone: e.target.value })}
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
              onChange={(e) => setPerson({ ...person, email: e.target.value })}
            />
            <label>Correo electronico </label>
            {errors.email && <Error message={errors.email[0]} />}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating ">
            <input
              type="password"
              className={`form-control ${errors.password && errorStyle()}`}
              placeholder="Nombre de usuario"
              onChange={(e) =>
                setPerson({ ...person, password: e.target.value })
              }
            />
            <label>Contraseña </label>
            {errors.password && <Error message={errors.password[0]} />}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <select
              className={`form-control ${errors.role && errorStyle()}`}
              onChange = {(e) => setPerson({...person, role : e.target.value})}
            >
              <option value='undefined' defaultValue>Abre este menú</option>
              <option value="staff">Empleado</option>
              <option value="admin" >Administrador</option>
            </select>
            <label>Seleciona el tipo de usuario</label>
            {errors.role && <Error message={errors.role[0]} />}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <select
              className={`form-control ${errors.companyPoint && errorStyle()}`}
              onChange = {(e) => setPerson({...person, companyPoint : e.target.value})}
            >
              <option value='undefined' defaultValue>Abre este menú</option>
              {points.map((point, index) => {
                return <option value={point.id} key={`point${index}`}>{point.name} </option>
              })}
              
            </select>
            <label>Seleciona la sede de acceso</label>
            {errors.companyPoint && <Error message={errors.companyPoint[0]} />}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <select
              className={`form-control ${errors.accessHour && errorStyle()}`}
              onChange = {(e) => setPerson({...person, accessHour : e.target.value})}
            >
              <option value='undefined' defaultValue>Abre este menú</option>
              {access.map((point,index) => {
                return <option value={point.id} key={`access${index}`}>{point.name}</option>
              })}
              
            </select>
            <label>Seleciona el horario de acceso</label>
            {errors.accessHour && <Error message={errors.accessHour[0]} />}
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
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
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
              onChange={(e) =>
                setAddress({ ...address, number: e.target.value })
              }
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
              onChange={(e) =>
                setLocation({ ...location, city: e.target.value })
              }
            />
            <label>Ciudad </label>
            {errors.city && <Error message={errors.city[0]} />}
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary mb-4"
          onClick={() => handleSubmit()}
        >
          Registrar informacion
        </button>
      </form>
    </div>
  );
};

export default Form;

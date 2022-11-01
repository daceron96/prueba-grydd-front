import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getList } from "../../app/services/personService";
import Detail from "../users/Detail";
import Form from "../users/Form";

export default function User() {
  const [title, setTitle] = useState("Lista de usuarios");
  const [view, setView] = useState("list");
  const [personList, setPersonList] = useState([]);

  const { user, login } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();

  const handleClick = () => {
    if (view === "list") {
      navigate("/company/list");
    } else {
      handleView("list");
    }
  };
  const handleView = (view) => {
    if (view === "list") {
      setTitle("Lista de usuarios");
    } else {
      setTitle("Registrar nuevo usuario");
    }
    setView(view);
  };

  const handleAddPerson = (data) => {
    const list = [...personList];
    list.push(data);
    setPersonList(list);
  };
  useEffect(() => {
    const sendData = async () => {
      try {
        const { data } = await getList(params);
        setPersonList(data);
      } catch (error) {
        console.log(error);
      }
    };

    sendData();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-4 d-flex justify-content-start align-items-center">
            <button
              className="btn btn-outline-primary"
              onClick={() => handleClick()}
            >
              <i className="bi bi-arrow-left-short"></i> Regresar
            </button>
          </div>
          <div className="col-md-4">
            <h2>{title}</h2>
          </div>
          <div className="col-md-4 d-flex justify-content-end align-items-center">
            {view === "list" && user.role === "admin" && (
              <button
                className="btn btn-primary"
                onClick={() => handleView("form")}
              >
                Registrar usuario
              </button>
            )}
          </div>
        </div>
        <hr />
        <div className="row mt-4">
          {user.role === "admin" ? (
            view === "list" ? (
              personList.length === 0 ? (
                <h6>No hay puntos empleados registrados</h6>
              ) : (
                <table className="table table-hover ">
                  <thead>
                    <tr>
                      <th scope="col">Rol</th>
                      <th scope="col">Identificacion</th>
                      <th scope="col">Nombres</th>
                      <th scope="col">Apellidos</th>
                      <th scope="col">Telefono</th>
                      <th scope="col">Correo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personList.map((detail, index) => {
                      return <Detail key={index} detail={detail} />;
                    })}
                  </tbody>
                </table>
              )
            ) : (
              <Form handleView={handleView} handleAddPerson={handleAddPerson} />
            )
          ) : (
            <h6>No cuentas con los permisos correspondientes</h6>
          )}
        </div>
      </div>
    </div>
  );
}

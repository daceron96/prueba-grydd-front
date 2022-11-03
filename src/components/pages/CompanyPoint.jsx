import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { getPointCompanyList } from "../../app/services/companyService";

import CardDetail from "../company_point/CardDetail";
import FormAccess from "../company_point/FormAccess";
import DetailAccessHour from "../company_point/DetailAccessHour";
import Form from "../company_point/Form";

export default function CompanyPoint() {
  const [pointsList, setPointsList] = useState([]);
  const [view, setView] = useState("list");
  const [title, setTitle] = useState("Lista de puntos");
  const [viewForm, setViewForm] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [idPoint, setIdPoint] = useState(null);

  const params = useParams();
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    const getList = async () => {
      try {
        const { data } = await getPointCompanyList(params);
        setPointsList(data);
      } catch (error) {
        if (error.response.status === 401) {
          // dispatch(setLogin(false))
          // navigate('/login')
          //TODO manejar el error cuando no esta logeado
        }
      }
    };
    getList();
  }, []);

  const handleClick = () => {
    if (view === "list") {
      navigate("/company/list");
    } else {
      handleView("list");
    }
  };

  const handleView = (view) => {
    if (view === "list") {
      setTitle("Lista de empresas");
    } else {
      setTitle("Registrar nuevo punto");
    }
    setView(view);
  };

  const handleAddPoint = (data) => {
    const list = [...pointsList];
    list.push(data);
    setPointsList(list);
  };

  return (
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
              Registrar Punto
            </button>
          )}
        </div>
      </div>
      <hr />
      <div className="row mt-4">
        {user.role === "admin" ? (
          view === "list" ? (
            pointsList.length !== 0 ? (
              pointsList.map((detail, index) => {
                return <CardDetail key={index} detail={detail} showForm={() => setViewForm(true)} setIdPoint={setIdPoint} showDetail={() => setViewDetail(true)} />;
              })
            )
            : (
              <h6>No hay puntos registrados</h6>
            )
          ) : (
            <Form
              company={params.id}
              handleAddPoint={handleAddPoint}
              handleView={handleView}
            />
          )
        ) : (
          <h6>No cuentas con los permisos correspondientes</h6>
        )}
        

      </div>
      {viewForm && <FormAccess hideForm={() => setViewForm(false)} idPoint={idPoint} setIdPoint={setIdPoint} />}
      {viewDetail && <DetailAccessHour hideDetail = {() => setViewDetail(false)} idPoint={idPoint} setIdPoint={setIdPoint}/>}
    </div>
  );
}

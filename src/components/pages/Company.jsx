import React, { useEffect, useState } from "react";
//service axios
import { getCompanyList } from "../../app/services/companyService";
//react-redux
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//components
import CardDetail from "../company/CardDetail";
import Form from "../company/Form";
//app
import { setLogin } from "../../app/slices/userSlice";

export default function Company() {
  const [companyList, setCompanyList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [view, setView] = useState("list");
  const [title, setTitle] = useState("Lista de empresas");
  const { user, login } = useSelector((state) => state.user);
  const handleView = (view) => {
    if (view === "list") {
      setTitle("Lista de empresas");
    } else {
      setTitle("Registrar nueva empresa");
    }
    setView(view);
  };

  const handleAddCompnay = (data) => {
    const list = [...companyList];
    list.push(data);
    setCompanyList(list);
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const { data } = await getCompanyList();
        setCompanyList(data);
      } catch (error) {
        if (error.response.status === 401) {
          // dispatch(setLogin(false));
          // navigate("/login");
          //TODO Menajera el error cuando no esta logeado
        }
      }
    };
    getList();
  }, []);

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-4 d-flex justify-content-start align-items-center">
          {view !== "list" && (
            <button
              className="btn btn-outline-primary"
              onClick={() => handleView("list")}
            >
              <i className="bi bi-arrow-left-short"></i> Regresar
            </button>
          )}
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
              Registrar empresa
            </button>
          )}
        </div>
      </div>
      <hr />
      <div className="row mt-4">
        {user.role === "admin" ? (
          view === "list" ? (
            companyList.map((detail, index) => {
              return <CardDetail key={index} detail={detail} />;
            })
          ) : (
            <Form handleView={handleView} handleAddCompnay={handleAddCompnay} />
          )
        ) : (
          <h6>No cuentas con los permisos correspondientes</h6>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { urlBase, logOut } from "../../../helpers/config";
import { useNavigate, useParams } from "react-router-dom";
import CardDetail from "../../company_point/CardDetail";
import { setLogin } from "../../../app/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

const PointList = () => {
  const [points, setPoints] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { login, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (login) {
      axios
        .get(`${urlBase}point/`, {
          params,
        })
        .then((response) => {
          setPoints(response.data);
        })
        .catch((response) => {
          console.log(response)
          logOut();
          dispatch(setLogin(false));
          // navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, []);

  const handleCreate = () => {
    navigate(`/company/point/create/${params.id}`);
  };

  const handleCreateAdmin = () => {
    navigate(`/users/create/${params.id}`);
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12">
          <h2>Lista de puntos</h2>
        </div>
        {user === "admin" && (
          <div className="btn-group col-6" role="group">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => handleCreate()}
            >
              Nuevo punto
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handleCreateAdmin()}
            >
              Nuevo administrador
            </button>
          </div>
        )}
      </div>
      <hr />
      <div className="row mt-4">
        {user === "admin" ? 
          points.length === 0 ? (
            <h2>No hay puntos de acceso registrados</h2>
          ) : (
            points.map((detail, index) => {
              return <CardDetail key={index} detail={detail} />;
            })
          )
          :
          <h6>No cuentas con los permisos necesarios</h6>
        }
      </div>
    </div>
  );
};

export default PointList;

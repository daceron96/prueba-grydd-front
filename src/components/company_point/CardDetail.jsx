import React from "react";
import PropTypes from "prop-types";

export default function CardDetail({ detail, setIdPoint, showForm, showDetail }) {

  const handleClickForm = () =>{
    setIdPoint(detail.id)
    showForm()
  }

  const handleShow = () => {
    setIdPoint(detail.id)
    showDetail()
  }

  return (
    <div className="col-md-6 col-xl-4 mb-3">
      <div className="card ">
        <div className="d-flex justify-content-center  card-header">
          <img
            src="https://images.pexels.com/photos/1337386/pexels-photo-1337386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="rounded"
            alt="..."
            style={{ maxWidth: "3rem" }}
          />
          <h5 className="text-muted fw-bolder ms-2 mt-1">{detail.name}</h5>
        </div>

        <div className="card-body ">
          <ul className="list-group list-group-flush ">
            <li className="list-group-item ">
              <strong>Nombre : </strong> {detail.name}
            </li>
            <li className="list-group-item ">
              <strong>Correo : </strong> {detail.email}
            </li>
            <li className="list-group-item ">
              <strong>Calle - Carrera: </strong> {detail.address.street}
            </li>
            <li className="list-group-item ">
              <strong>Número: </strong> {detail.address.number}
            </li>
            <li className="list-group-item ">
              <strong>Barrio: </strong> {detail.address.district}
            </li>
            <li className="list-group-item ">
              <strong>Código postal: </strong> {detail.address.postalCode}
            </li>
          </ul>
          <button className="btn btn-outline-primary" onClick={() => handleShow()} >Ver horarios</button>
          <button
            className="btn btn-outline-primary"
            onClick={() => handleClickForm()}
          >
            Nuevo horario
          </button>
        </div>
      </div>
    </div>
  );
}

CardDetail.propTypes = {
  detail: PropTypes.object.isRequired,
};

import React from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

export default function CardDetail({detail}) {
  const navigate = useNavigate();

  const handleDetail = (nit) => {
    // navigate(`/company/point/${id}`)
    navigate(`/company/point/list/${nit}`)
    // 
  }
  return (
    
        <div className="col-md-6 col-xl-4 mb-3"  >
          <div className="card ">
            <div className="d-flex justify-content-center  card-header">
              <img
                src="https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="rounded"
                alt="..."
                style={{ "maxWidth": "3rem" }}
              />
              <h5 className="text-muted fw-bolder ms-2 mt-1">{detail.companyName}</h5>
            </div>

            <div className="card-body  ">
              <ul className="list-group list-group-flush ">
                <li className="list-group-item "><strong>Nit : </strong> {detail.nit}</li>
                <li className="list-group-item "><strong>Nombre comercial : </strong>{detail.tradeName}</li>
                <li className="list-group-item "><strong>Telefono : </strong>{detail.phone}</li>
                <li className="list-group-item "><strong>Correo : </strong>{detail.email}</li>
              </ul>
              <button className='btn btn-outline-primary btn-sm text-center' onClick={() => handleDetail(detail.nit)}>Ver Puntos</button>
            </div>
          </div>
        </div>
      
  )
}

CardDetail.propTypes = {
  detail : PropTypes.object.isRequired
}




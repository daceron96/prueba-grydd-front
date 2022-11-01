import React, { useState } from "react";
import { createAccessHour } from "../../app/services/accessHourService";
import Error from "../helpers/Error";

const FormAccess = (id) => {
  
  const [accessHour, setAccessHour] = useState({ companyPoint: id });
  const [errors, setErrors] = useState({});

  const errorStyle = () => {
    return `is-invalid`;
  };

  const handleCloseModal = () =>{
    const element = document.getElementById('modal-form')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const sendData = async () => {
      try {
        const data = await createAccessHour(accessHour);
        setErrors({})
      } catch (error) {
        setErrors(error.response.data);
      }
    };
    sendData()
  };

  return (
    <div className="modal fade" data-bs-backdrop="static" id="modal-form">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Nuevo horario de acceso</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body justify-content-center">
            <form className="mt-3">
              <div className="row mt-3 align-items-center">
                <div className="col-5">
                  <label className="col-form-label">Hora de inicio</label>
                </div>
                <div className="col-5">
                  <input
                    type="time"
                    className={`form-control ${errors.startTime && errorStyle()}`}
                    onChange={(e) =>
                      setAccessHour({ ...accessHour, startTime: e.target.value })
                    }
                  />
                  {errors.startTime && <Error message={errors.startTime[0]} />}
                </div>
              </div>
              <div className="row mt-3 align-items-center">
                <div className="col-5">
                  <label className="col-form-label">Hora de fin</label>
                </div>
                <div className="col-5">
                  <input
                    type="time"
                    className={`form-control ${errors.endTime && errorStyle()}`}
                    onChange={(e) =>
                      setAccessHour({ ...accessHour, endTime: e.target.value })
                    }
                  />

                  {errors.endTime && <Error message={errors.endTime[0]} />}
                </div>
              </div>
              <div className="modal-footer mt-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => handleCloseModal()}
                >
                  Cerrar
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={(e) => handleSubmit(e)}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAccess;

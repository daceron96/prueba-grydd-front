import React from "react";
import { useState } from "react";
import Error from "../helpers/Error";
import { validateAccess } from "../../app/services/personService";

const modalStyle = {
  display: "block",
  backgroundColor: "rgba(0,0,0,0.6)",
};

const FormAccessPerson = ({ hideForm }) => {
  const [errors, setErrors] = useState({});
  const [credentials, setCredentials] = useState({});

  const handleClose = () => {
    hideForm();
  };

  const errorStyle = () => {
    return `is-invalid`;
  };

  const handleSendData = () => {
    const sendData = async () => {
      try {
        if(credentials.data !== undefined){
          const params = JSON.parse(credentials.data);
          const { data } = await validateAccess(params);
          console.log(data);
        }else{
          setErrors({...errors ,qr : 'El campo es requerido'})
        }
        
      } catch (error) {
        console.log(error)
        setErrors({...errors , qr : error.response.data.message})

      }
    };
    sendData();
  };

  return (
    <div className="modal fade show" tabIndex="-1" style={modalStyle}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Escanea el código</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => handleClose()}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="row mt-3 align-items-center">
                <div className="col-3">
                  <label className="col-form-label">QR</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className={`form-control ${errors.qr && errorStyle()}`}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        data: e.target.value,
                      })
                    }
                  />
                  {errors.qr && <Error message={errors.qr} />}
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleClose()}
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSendData()}
            >
              Validar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAccessPerson;

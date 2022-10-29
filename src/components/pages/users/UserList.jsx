import React from "react";

export default function UserList() {
  function handleCreate() {
    console.log("holis");
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-9">
          <h2>Lista de puntos</h2>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary" onClick={() => handleCreate()}>
            Registrar nuevo usuario
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
}

import React from 'react'
import {useParams} from 'react-router-dom';
import Form from '../../users/Form';

export default function UserForm() {

  const params = useParams()

  return (
    <div className="container">
      <div className="row mt-3 mx-auto">
        <div className="card">
          <div className="card-body">
            <h5>Registro de nuevo usuario</h5>
            <hr />
            <Form company={params.nit} />
          </div>
        </div>
      </div>
    </div>
  )
}

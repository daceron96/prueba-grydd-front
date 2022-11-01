import React from 'react';

const Detail = ({detail}) => {
  return (
    <tr className='mt-5'>
      {detail.role === 'admin' ?(
        <td>Administrador</td>
      ):(
        <td>Empleado</td>
      )}
      <td >{detail.identifier}</td>
      <td>{detail.names}</td>
      <td>{detail.surNames}</td>
      <td>{detail.phone}</td>
      <td>{detail.email}</td>

    </tr>
  );
}

export default Detail;

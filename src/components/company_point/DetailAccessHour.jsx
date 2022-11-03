import React, { useEffect, useState } from "react";
import {getListAccess} from '../../app/services/accessHourService'
import UlDetailAccess from './UlDetailAccess'

const modalStyle = {
  display: "block",
  backgroundColor: "rgba(0,0,0,0.6)",
};
export default function DetailAccessHour({hideDetail,idPoint, setIdPoint}) {

  const [list, setList] = useState([]);

  useEffect(() => {
    const getData = async() =>{
      try{
        const {data} = await getListAccess(idPoint)
        setList([...data])
      }catch(error){
        console.log(error)
      }
    }

    getData()
  }, []);

  const handleHide = () =>{
    setIdPoint(null)
    hideDetail()
  }

  return (
    <div className="modal fade show" tabIndex="-1" style={modalStyle}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Lista de horarios</h5>
            <button type="button" className="btn-close" onClick={() => handleHide()}></button>
          </div>
          <div className="modal-body">
            
            {list.length === 0 ?
              <h6>No hay horarios creados</h6>
              :
              list.map((detail,index) => {
              return <UlDetailAccess detail={detail} key={index}/>
            })}

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => handleHide()}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React,{useState} from 'react';
import useForm from '../../app/hooks/useForm';
import Error from '../helpers/Error';


const errorStyle = () => {
  return `is-invalid`;
};

const LocationForm = () => {
  const {location, errors} = useForm()
  const [data, setData] = useState({});
  return (
    <>
      <h6>Datos de ubicación</h6>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="text"
            className={`form-control ${errors.country && errorStyle()}`}
            placeholder="País"
            onChange={(e) =>
              setData({ ...location, country: e.target.value })
            }
          />
          <label>País </label>
          {errors.country && <Error message={errors.country[0]} />}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="text"
            className={`form-control ${errors.department && errorStyle()}`}
            placeholder="Departamento"
            onChange={(e) =>
              setData({ ...location, department: e.target.value })
            }
          />
          <label>Departamento </label>
          {errors.department && <Error message={errors.department[0]} />}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating ">
          <input
            type="text"
            className={`form-control ${errors.city && errorStyle()}`}
            placeholder="Ciudad"
            onChange={(e) => setData({ ...location, city: e.target.value })}
          />
          <label>Ciudad </label>
          {errors.city && <Error message={errors.city[0]} />}
        </div>
      </div>
    </>
  );
}

export default LocationForm;

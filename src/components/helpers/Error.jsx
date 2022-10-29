import React from 'react'
import PropTypes from 'prop-types';

const Error = ({message}) =>{
  return (
    <div className="invalid-feedback">
      {message}
    </div>
  )
}

Error.propTypes = {
  message : PropTypes.string
}

export default Error;

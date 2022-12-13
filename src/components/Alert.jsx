import React, { useEffect } from 'react';
import '../styles/Alert.sass'

const Alert = ({type, message, removeAlert, todos}) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert();
        }, 5000);
        return() => clearTimeout(timeout);
    }, [todos])
  return (
    <p className={`alert alert-${type}`}>{message}</p>
  )
};

export default Alert;

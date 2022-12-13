import React, { useEffect } from "react";
import "../styles/Alert.sass";

const Alert = ({ type, message, removeAlert, todos }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert();
        }, 3000);
        return () => clearTimeout(timeout);
    }, [todos, removeAlert]);
    return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;

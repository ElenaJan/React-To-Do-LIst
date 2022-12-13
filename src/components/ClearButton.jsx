import React from "react";
import "../styles/ClearButton.sass";

const ClearButton = ({ clearTodos }) => {
    return (
        <div className="delete-container">
            <button className="btn-delete" 
                    onClick={clearTodos}>
                Удалить все задачи
            </button>
        </div>
    );
};

export default ClearButton;

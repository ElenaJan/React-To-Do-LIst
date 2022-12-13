import React from "react";
import "../styles/Todo.sass";
import completeIcon from "../img/complete.svg";
import editIcon from "../img/edit.svg";
import deleteIcon from "../img/close.svg";

const Todo = ({ text, isImportant, isCompleted, makeImportantTodo, completeTodo, deleteTodo, editTodo, id }) => {
    let todoClassName = `todo ${isImportant && "todo-important"}`;
    let todoImportantBtnClassName = `todo__importantBtn ${
        isImportant && "todo__importantBtn-true"
    }`;
    let todoTextClassName = `todo__text ${
        isCompleted && "todo__text-completed"
    }`;

    return (
        <div className={todoClassName}>
            <div className="todo__text-content">
                <button
                    className={todoImportantBtnClassName}
                    onClick={() => makeImportantTodo(id)}>
                    ☆
                </button>
                <p className={todoTextClassName}>{text}</p>
            </div>
            <div className="todo__buttons">
                <button
                    className="todo__button todo__button-complete"
                    onClick={() => completeTodo(id)}>
                    <img src={completeIcon} alt="complete-icon" />
                </button>
                <button
                    className="todo__button todo__button-edit"
                    onClick={() => editTodo(id)}>
                    <img src={editIcon} alt="edit-icon" />
                </button>
                <button
                    className="todo__button todo__button-delete"
                    onClick={() => deleteTodo(id)}>
                    <img src={deleteIcon} alt="delete-icon" />
                </button>
            </div>
        </div>
    );
};

export default Todo;

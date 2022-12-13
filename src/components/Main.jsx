import React, { useState } from 'react';
import '../styles/Main.sass'
import { uid } from 'uid';
import Alert from './Alert';
import clip from '../img/clip.png';
import Header from './Header';
import ornamentBig from '../img/ornamentBig.png';
import ornament from '../img/ornament.png';
import Todo from './Todo';

const Main = () => {
    const [ text, setText ] = useState("");
    const [ todos, setTodos ] = useState(JSON.parse(localStorage.getItem('todos')));
    const [ isEditing, setIsEditing ] = useState(false);
    const [editID, setEditId] = useState(null);
    const [ alert, setAlert ] = useState({show: false, message: "", type: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!text) {
            showAlert(true, "danger", "Пожалуйста, введите значение");
        } else if(text && isEditing) {
            let newTodos = todos.map((item) => {
                if(item.id === editID) {
                    return {...item, text: text}
                }
                return item;
            })
            localStorage.setItem('todos', JSON.stringify(newTodos));
            setTodos(JSON.parse(localStorage.getItem('todos')));
            setText('');
            setEditId(null);
            setIsEditing(false);
            showAlert(true, "success", "Задача изменена");
        } else {
            showAlert(true, "success", "Задача доблена");
            let newTodos = todos === null ? [
                {
                    id: uid(),
                    text: text,
                    isImportant: false,
                    isCompleted: false,
                }
            ] : [
                ...todos,
                {
                    id: uid(),
                    text: text,
                    isImportant: false,
                    isCompleted: false,
                }
            ]
            localStorage.setItem('todos', JSON.stringify(newTodos));
            setTodos(JSON.parse(localStorage.getItem('todos')));
            setText('');
        }
    };

    const showAlert = (show, type, message='') => {
        setAlert({ show, type, message });
    };

    const deleteTodo = (id) => {
        showAlert(true, "warning", "Задача удалена");
        let newTodos = todos.filter((item) => {
            return item.id !== id;
        })
        localStorage.setItem('todos', JSON.stringify(newTodos));
        setTodos(JSON.parse(localStorage.getItem('todos')));
    }

    const editTodo = (id) => {
        const editItem = todos.find((item) => item.id === id);
        setIsEditing(true);
        setEditId(id);
        setText(editItem.text);
    };

    const makeImportantTodo = (id) => {
        const importantItem = todos.find(item => item.id === id);
        if(importantItem.isImportant) {
            showAlert(true, "warning", "Данная задача больше не является важной"); 
        } else {
            showAlert(true, "success", "Задача отмечена как важная!"); 
        }
        let newTodos = todos.map((item) => {
            if(item.id === id) {
                return {
                    ...item,
                    isImportant: !item.isImportant
                }
            }
            return item;
        })
        localStorage.setItem('todos', JSON.stringify(newTodos));
        setTodos(JSON.parse(localStorage.getItem('todos')));
    }

    const completeTodo = (id) => {
        const completedItem = todos.find(item => item.id === id);
        if(completedItem.isCompleted) {
            showAlert(true, "warning", "Задача пока не выполнена"); 
        } else {
            showAlert(true, "success", "Задача выполнена!"); 
        }
        let newTodos = todos.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    isCompleted: !item.isCompleted
                }
            }
            return item;
        })
        localStorage.setItem('todos', JSON.stringify(newTodos));
        setTodos(JSON.parse(localStorage.getItem('todos')));
    }

    const clearTodos = () => {
        showAlert(true, "warning", "Все задачи удалены");
        localStorage.removeItem('todos');
        setTodos(JSON.parse(localStorage.getItem('todos')));
    }

    return (
        <section className="main">
            {alert.show && <Alert {...alert} removeAlert={showAlert} todos={todos} />}
            <div className="clip">
                <img src={clip} alt="clip" />
            </div>
            <div className="main__container">
                <Header />
                <div className="ornament-big">
                    <img src={ornamentBig} alt="ornament" />
                </div>
                <div className="todo__add">
                    <form action="#" className="todo__form" onSubmit={(e) => handleSubmit(e)}>
                        <input
                            type="text"
                            className="todo__input"
                            placeholder="Введите задачу"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button type="submit" 
                                className="todo__button-submit" 
                                >{isEditing ? "Изменить" : "Добавить"}
                        </button>
                    </form>
                </div>
                <div className="ornament">
                    <img src={ornament} alt="ornament" />
                </div>
                <div className="wrapper">
                    <div className="todos">
                    {
                        todos?.map(todo => {
                        return <Todo
                        id={todo.id}
                        deleteTodo={deleteTodo} 
                        key={todo.id} 
                        text={todo.text} 
                        isImportant={todo.isImportant}
                        makeImportantTodo={makeImportantTodo}
                        isCompleted={todo.isCompleted}
                        completeTodo={completeTodo}
                        editTodo={editTodo} />
                        })
                    }
                    </div>
                </div>
                <div className="delete-container">
                <button 
                    className="btn-delete" onClick={clearTodos}>Удалить все задачи</button>
                </div> 
            </div>
        </section>
    )
}

export default Main;

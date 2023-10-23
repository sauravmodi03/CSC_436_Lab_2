import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import '../css/Home.css';


function Home({ activeUser, processLogout }) {

    var [todo, setTodo] = useState('');
    var [description, setDescription] = useState('');
    const author = activeUser?.user?.email;

    const navigate = useNavigate();


    const todoReducer = (todos, action) => {
        switch (action.type) {
            case "add":
                return [...todos, action.todo];
            case "toggle":
                const newTodos = todos.map((todo, i) => {
                    if (i === action.index) {
                        todo.isCompleted = action.checked;
                        todo.dateComplete = action.checked ? new Date().toLocaleString() : null
                    }
                    return todo;
                });
                return [...newTodos];
            case "delete":
                // const list = todos.filter((todo, i) => i !== action.index);
                const list = [...todos.slice(0, action.index), ...todos.slice(action.index + 1)]
                return [...list];
            default:
                return todos;
        }

    }

    const [todos, todoDispatcher] = useReducer(todoReducer, activeUser.todos);


    const addTodo = (e) => {
        e.preventDefault();

        //Creating todo object
        const temp = {
            "name": todo,
            "author": author,
            "description": description,
            "isCompleted": false,
            "dateCreated": new Date().toLocaleString(),
            "dateComplete": null
        }

        //Calling todo dispatcher to add todo in global list
        todoDispatcher({ type: "add", todo: temp })

        //Resetting todo form
        setTodo('');
        setDescription('');
    }

    const updateTodo = (e, i, value) => {
        todoDispatcher({ type: 'toggle', index: i, checked: value })
    }

    const deleteTodo = (e, i) => {
        todoDispatcher({ type: "delete", index: i });
    }

    const logout = () => {
        alert("You have succesfully logged out...!!!")
        activeUser.todos = todos;
        activeUser.state = "LOGGED_OUT";
        processLogout(activeUser)
        navigate("/");

    }

    useEffect(() => {
        if (activeUser.user === undefined) {
            navigate("/");
        }
    }, [todos, activeUser, navigate]);

    return (
        <div className="Home wrapper">
            <div className="container">
                <div className="row">
                    <div className="col">Hi {author}!</div>
                    <div className="col"><button onClick={() => logout()} >Logout</button></div>
                </div>
                <div className="row card">
                    <div className="card-header">Todos</div>
                    <div className="card-body">
                        <form onSubmit={addTodo}>
                            <div className="row">
                                <div className="col"><input type="text" value={todo} className="inpt-add" required onChange={e => setTodo(e.target.value)} placeholder="Add Todo Here" /></div>
                            </div>
                            <div className="row">
                                <div ><input type="text" className="inpt-add" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" /></div>
                            </div>
                            <div className="row">
                                <div className="col-4"><button name="AddTodo" className="add-btn">Add Todo</button></div>
                            </div>
                        </form>
                        {
                            todos?.map ? todos.map((todo, i) => {
                                return <div key={todo.author + "_" + i} className="card">
                                    <div className="row">
                                        <div className="col-1"><input type="checkbox" checked={todo.isCompleted} onChange={(e) => updateTodo(e, i, e.target.checked)} /></div>
                                        <div className="col-9">
                                            <div className="row">
                                                <span className="col-4">Title: </span><div className="col">{todo.name}</div>
                                            </div>
                                            <div className="row">
                                                <span className="col-4">Author: </span><div className="col">{todo.author}</div>
                                            </div>
                                            <div className="row">
                                                <span className="col-4">Description: </span><div className="col">{todo.description}</div>
                                            </div>
                                            <div className="row">
                                                <span className="col-4">Complete: </span><div className="col">{todo.isCompleted ? "Completed" : "Not Completed"}</div>
                                            </div>
                                            <div className="row">
                                                <span className="col-4">Date Created: </span><div className="col">{todo.dateCreated}</div>
                                            </div>
                                            <div className="row">
                                                <span className="col-4">Date Completed: </span><div className="col">{todo.dateComplete}</div>
                                            </div>
                                        </div>
                                        <div className="col-1">
                                            <button type="button" className="btn btn-primary d-flex" onClick={(e) => deleteTodo(e, i)} placeholder="Delete" >Delete</button>
                                        </div>
                                    </div>
                                </div>
                            })
                                : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
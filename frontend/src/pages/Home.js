import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import '../css/Home.css';
import { StateContext } from "../context";
import { useResource } from "react-request-hook";


function Home({ activeUser, processLogout }) {

    var [todo, setTodo] = useState('');
    var [description, setDescription] = useState('');

    const stateContext = useContext(StateContext);

    const author = stateContext?.activeUser?.email;

    const [todosResponse, getTodos] = useResource(() => ({
        url: `/todos?author=${author}`,
        method: "get"
    }));

    useEffect(getTodos, []);

    const [addResponse, addNewTodo] = useResource((todo) => ({
        url: '/todos',
        method: 'post',
        data: todo
    }))

    // useEffect(addNewTodo => {
    //     if (addResponse?.data) {
    //         todoDispatcher({ type: "add", todos: addResponse.data });
    //     }
    // })

    const [updatedTodo, updateTodoResource] = useResource((todo) => ({
        url: `/todos/${todo.id}`,
        method: 'put',
        data: todo
    }));

    const [deleteResponse, deleteTodoResource] = useResource((id) => ({
        url: `/todos/${id}`,
        method: 'delete'
    }));





    const navigate = useNavigate();

    const todoReducer = (todos, action) => {
        switch (action.type) {
            case "init":
                return [...todos, ...action.todos]
            case "add":
                return [...todos, action.todo];
            case "update":
                const listTodos = todos.map((obj) => {
                    if (obj.id === action.todo.id) {
                        return action.todo;
                    }
                    return obj;
                })
                return [...listTodos];
            case "delete":
                const list = [...todos.slice(0, action.index), ...todos.slice(action.index + 1)]
                return [...list];
            default:
                return todos;
        }

    }

    const [todos, todoDispatcher] = useReducer(todoReducer, []);

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

        addNewTodo(temp);

        if (addResponse?.data) {
            //Calling todo dispatcher to add todo in global list
            todoDispatcher({ type: "add", todos: addResponse.data });
        }

        //Resetting todo form
        setTodo('');
        setDescription('');
    }

    const updateTodo = (e, i, value, todo) => {
        todo.isCompleted = value;
        todo.dateComplete = value ? new Date().toLocaleString() : null
        updateTodoResource(todo);

    }

    const deleteTodo = (e, i, id) => {
        deleteTodoResource(id)
    }

    const logout = () => {
        stateContext.userDispatch({ type: "logout" });
        alert("You have succesfully logged out...!!!");
        navigate("/");
    }

    useEffect(() => {
        getTodos();
        if (!stateContext?.activeUser?.email) {
            navigate("/");
        }

    }, [todos, activeUser, navigate, addResponse, updatedTodo, deleteResponse]);

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
                            todosResponse?.data?.map ? todosResponse.data.map((todo, i) => {
                                return <div key={todo.author + "_" + i} className="card">
                                    <div className="row">
                                        <div className="col-1"><input type="checkbox" checked={todo.isCompleted} onChange={(e) => updateTodo(e, i, e.target.checked, todo)} /></div>
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
                                            <button type="button" className="btn btn-primary d-flex" onClick={(e) => deleteTodo(e, i, todo.id)} placeholder="Delete" >Delete</button>
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
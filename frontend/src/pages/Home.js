import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import '../css/Home.css';
import { StateContext } from "../context";
import { useResource } from "react-request-hook";


function Home() {

    const { state, dispatch: dispatcher } = useContext(StateContext);
    var [todo, setTodo] = useState('');
    var [description, setDescription] = useState('');
    var [author] = useState(state?.user?.username);


    const { user, todos } = state;

    const [todosResponse, getTodos] = useResource(() => ({
        url: "/todo",
        method: "get",
        headers: { Authorization: `${state.user.access_token}` },
    }));

    useEffect(() => { getTodos(); }, [state?.user?.access_token]);

    useEffect(() => {
        if (todosResponse && todosResponse.isLoading === false && todosResponse.data) {
            dispatcher({
                type: "GET_TODOS",
                todos: todosResponse.data.reverse(),
            });
        }
    }, [todosResponse]);



    const [addResponse, addNewTodo] = useResource((todo) => ({
        url: '/todo',
        method: 'post',
        data: todo,
        headers: { Authorization: `${state?.user?.access_token}` }
    }));

    useEffect(() => {
        if (addResponse.isLoading === false && addResponse?.data) {
            dispatcher({
                type: "ADD",
                todo: addResponse.data?.todo
            });
        }
    }, [addResponse]);

    const [updatedResponse, updateTodoResource] = useResource((todo) => ({
        url: `/todo/${todo._id}`,
        method: 'put',
        data: todo,
        headers: { Authorization: `${state.user.access_token}` }
    }));

    useEffect(() => {
        if (updatedResponse.isLoading === false && updatedResponse?.data) {
            dispatcher({
                type: "UPDATE",
                todo: updatedResponse.data
            })
        };
    }, [updatedResponse]);

    const [deleteResponse, deleteTodoResource] = useResource((id) => ({
        url: `/todo/${id}`,
        method: 'delete',
        headers: { Authorization: `${state.user.access_token}` }
    }));

    useEffect(() => {
        if (deleteResponse.isLoading === false && deleteResponse?.data) {
            dispatcher({
                type: "DELETE_TODO",
                id: deleteResponse.data.id
            })
        };

    }, [deleteResponse]);


    const navigate = useNavigate();

    const addTodo = (e) => {
        e.preventDefault();

        //Creating todo object
        const temp = {
            "title": todo,
            "description": description,
            "isCompleted": false
        }

        addNewTodo(temp);

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
        dispatcher({ type: "LOGOUT" });
        dispatcher({ type: "CLEAR_TODOS" });
    }

    useEffect(() => {
        if (!state?.user?.access_token) {
            navigate("/");
        }
    })

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
                            todos.map ? todos.map((todo, i) => {
                                return <div key={todo.author + "_" + i} className="card">
                                    <div className="row">
                                        <div className="col-1"><input type="checkbox" checked={todo.isCompleted} onChange={(e) => updateTodo(e, i, e.target.checked, todo)} /></div>
                                        <div className="col-9">
                                            <div className="row">
                                                <span className="col-4">Title: </span><div className="col">{todo.title}</div>
                                            </div>
                                            <div className="row">
                                                <span className="col-4">Author: </span><div className="col">{user.username}</div>
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
                                            <button type="button" className="btn btn-primary d-flex" onClick={(e) => deleteTodo(e, i, todo._id)} placeholder="Delete" >Delete</button>
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
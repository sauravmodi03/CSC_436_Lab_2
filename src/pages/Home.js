import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import '../css/Home.css';


function Home() {

    const location = useLocation();

    var [todo, setTodo] = useState('');
    var [description, setDescription] = useState('');
    var [todos, setTodos] = useState([]);
    var [id, setId] = useState(0);
    var [author, setAuthor] = useState('');


    const addTodo = (e) => {
        e.preventDefault();

        setId(id + 1);

        todos.push(
            {
                "id": id,
                "name": todo,
                "author": author,
                "description": description,
                "isCompleted": false,
                "dateCreated": new Date().toLocaleString(),
                "dateComplete": null
            }
        )
        setTodo('');
        setDescription('');
    }

    const updateTodo = (index, value) => {

        const updated = todos.map(todo => {
            if (todo.id === index) {
                todo.isCompleted = !todo.isCompleted;
                todo.dateComplete = todo.isCompleted ? new Date().toLocaleString() : null
            }
            return todo
        })

        setTodos(updated);
    }

    useEffect(() => {
        setAuthor(location.state.username);
    }, [location.state.username]);

    return (
        <div className="Home wrapper">
            <div className="container">
                <div className="row">
                    <div className="col">Hi {author}!</div>
                    <div className="col"><Link to="/">Logout</Link></div>
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
                            todos.map((todo, i) => {
                                return <div key={i} className="card">
                                    <div className="row">
                                        <div className="col-1"><input type="checkbox" value={todo.isCompleted} onChange={(e) => updateTodo(todo.id, todo.isCompleted)} /></div>
                                        <div className="col">
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
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
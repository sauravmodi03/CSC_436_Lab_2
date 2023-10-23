import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { useEffect, useReducer, useState } from 'react';


function App() {

  const [activeUser, setActiveUser] = useState({});

  const userReducer = (users, action) => {
    switch (action.type) {
      case "add":
        return [...users, action.user];
      case "login":
        users.map((obj) => {
          if (obj.user.email === action.username) {
            obj.state = "LOGGED_IN"
            setActiveUser(obj);
          }
          return obj;
        });
        return [...users];
      case "update":
        users.map((obj) => {
          if (obj.user.email === action.user.email) {
            obj.user = action.user;
          }
          return obj;
        });
        return [...users];
      default:
        return users;
    }
  }

  const [users, userDispatch] = useReducer(userReducer, []);


  const loggedUser = (username) => {
    userDispatch({ type: "login", username: username });
    console.log(username);
  }

  const newUser = (user) => {
    userDispatch({ type: 'add', user: user });
  }

  const processLogout = (userData) => {
    userDispatch({ type: "update", user: userData });
  }

  useEffect(() => {

    const testUser = {
      state: "LOGGED_OUT",
      todos: [],
      user: {
        fname: "test",
        lname: "test",
        email: "test@test.com",
        password: "test"
      }
    }
    if (users.length === 0) {
      userDispatch({ type: "add", user: testUser });
    }

  })

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login users={users} loggedUser={loggedUser} />} />
          <Route path='/login' element={<Login users={users} loggedUser={loggedUser} />} />
          <Route path='register' element={<Register newUser={newUser} />} />
          <Route path='home' element={<Home activeUser={activeUser} processLogout={processLogout} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

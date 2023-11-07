import { BrowserRouter, Route, Routes, useResolvedPath } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { useEffect, useReducer, useState } from 'react';
import { StateContext, UsersContext } from './context';
import { useResource } from 'react-request-hook';


function App() {

  const [activeUser, setActiveUser] = useState({});

  const [listUsers, getUsers] = useResource(() => ({
    url: "/users",
    method: "get"
  }));

  useEffect(getUsers, []);

  const userReducer = (users, action) => {
    switch (action.type) {
      case "init":
        return [...users, ...action.users];
      case "add":
        return [...users, action.user];
      case "login":
        users.map((obj) => {
          if (obj.email === action.username) {
            setActiveUser(obj);
          }
          return obj;
        });
        return [...users];
      case "logout":
        setActiveUser({});
        return [...users];
      case "update":
        users.map((obj) => {
          if (obj.email === action.user.email) {
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

  useEffect(() => {

    if (listUsers?.data && users.length === 0) {
      userDispatch({ type: "init", users: listUsers.data });
    }

  }, [listUsers])

  return (
    <div className="App">
      <StateContext.Provider value={{ users, userDispatch, activeUser }}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='home' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
}

export default App;

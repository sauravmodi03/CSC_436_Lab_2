import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';


function App() {



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

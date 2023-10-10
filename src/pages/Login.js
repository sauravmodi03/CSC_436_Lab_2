import { Link, useNavigate } from "react-router-dom";
import '../css/Login.css';
import { useEffect, useState } from "react";


function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg] = useState('');


    const validate = (event) => {
        navigate('/home', { state: { username: username } });
    }

    useEffect(() => {

    })

    return (
        <div className="Login rounded-3 d-flex justify-content-center">
            <div className="container">
                <div className="form">
                    <form onSubmit={validate}>
                        <div className="row">
                            <div className="col"><input type="text" required placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /></div>
                        </div>
                        <div className="row">
                            <div className="col"><input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /></div>
                        </div>
                        <div className="row">
                            <span className="">Forgot Password?</span>
                        </div>
                        <div className="row">
                            <div className="col lgn-btn">
                                <input type="submit" className="btn-success lgn-btn" name="Login" value="Login" />
                            </div>
                        </div>
                        <div className="row">
                            Not a member?<Link className="col" to="/register">Sign Up</Link>
                        </div>
                        <div className="row">
                            <span className="col">{errorMsg}</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
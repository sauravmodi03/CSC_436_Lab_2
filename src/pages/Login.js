import { Link, useNavigate } from "react-router-dom";
import '../css/Login.css';
import { useState } from "react";


function Login({ users, loggedUser }) {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg] = useState('');


    const validate = (event) => {
        event.preventDefault();
        console.log("login", users);
        const obj = users.filter((obj) => obj.user.email === username && obj.user.password === password);

        if (obj[0]?.user) {
            loggedUser(obj[0].user.email);
            navigate('/home');
        } else {
            alert("Invalid credentials..!!!");
        }

    }

    return (
        <>
            <div className="Login rounded-3 d-flex justify-content-center">
                <div className="container">
                    <div className="form">
                        <form onSubmit={validate}>
                            <div className="row">
                                <div className="col"><input type="text" required placeholder="Username/Email" value={username} onChange={e => setUsername(e.target.value)} /></div>
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
            <div className="container card">
                <span>Note: For testing purpose a test user is already created with below credentials.</span>
                <span>Username : test@test.com, Password : test</span>
                <span>New user's can still be registerd and state will be maintained individually for each user.</span>
            </div>
        </>
    );
}

export default Login;
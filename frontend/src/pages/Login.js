import { Link, useNavigate } from "react-router-dom";
import '../css/Login.css';
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context";
import { useResource } from "react-request-hook";


function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg] = useState('');

    const { state, dispatch: dispatchUser } = useContext(StateContext);

    const [loginResponse, login] = useResource((loginRequest) => ({
        url: '/auth/login',
        method: 'post',
        data: loginRequest,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    }))

    async function validate(event) {
        event.preventDefault();

        const loginRequest = {
            username: email,
            password: password
        }
        login(loginRequest);

    }

    useEffect(() => {
        if (loginResponse && loginResponse.isLoading === false && (loginResponse.data || loginResponse.error)) {
            if (loginResponse.error) {
                alert("Login failed, please try again later." + "\nError: " + loginResponse.error.message);
            } else {
                dispatchUser({
                    type: "LOGIN",
                    username: email,
                    access_token: loginResponse.data.access_token
                })
                navigate('/home');
            }
        }
    }, [loginResponse])


    return (
        <>
            <div className="Login rounded-3 d-flex justify-content-center">
                <div className="container">
                    <div className="form">
                        <form onSubmit={validate}>
                            <div className="row">
                                <div className="col"><input type="text" required placeholder="Username/Email" value={email} onChange={e => setEmail(e.target.value)} /></div>
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
        </>
    );
}

export default Login;
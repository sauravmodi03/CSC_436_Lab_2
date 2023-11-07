import { Link, useNavigate } from "react-router-dom";
import '../css/Login.css';
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context";
import { useResource } from "react-request-hook";


function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg] = useState('');

    const stateContext = useContext(StateContext);

    const [loginResponse, login] = useResource((loginRequest) => ({
        url: '/login',
        method: 'post',
        data: loginRequest
    }))

    async function validate(event) {
        event.preventDefault();

        const loginRequest = {
            email: username,
            password: password
        }

        login(loginRequest)

        if (loginResponse?.data) {

        } else {

        }

    }

    useEffect(() => {

        if (loginResponse?.data) {
            stateContext.userDispatch({ type: "login", username: loginResponse.data.user.email })
            navigate('/home');
        } else if (loginResponse?.error) {
            console.log(loginResponse.error);
            var errorMsg = loginResponse?.error?.data;
            if (errorMsg === undefined)
                errorMsg = "Invalid Credentials."
            alert(errorMsg);
        }

    }, [loginResponse])


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
                <span>Username : test@test.com, Password : test123</span>
                <span>New user's can still be registerd and state will be maintained individually for each user.</span>
            </div>
        </>
    );
}

export default Login;
import { useNavigate } from "react-router-dom";

import '../css/Register.css';
import { useState } from "react";


function Register({ newUser }) {

    const navigate = useNavigate();
    // const alert = useAlert();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');

    const user = {
        fname: fname,
        lname: lname,
        email: email,
        password: password
    }

    const validateRegister = () => {
        // alert.show('Successfully registered !')
        newUser(user);
        navigate('/');
    }

    return (
        <div className="Register wrapper rounded-3 d-flex justify-content-center">
            <div className="container">
                <form>
                    <div className="row">
                        <div className="col"><input type="text" value={fname} required onChange={e => setFname(e.target.value)} placeholder="Firstname" /></div>
                    </div>
                    <div className="row">
                        <div className="col"><input type="text" value={lname} required onChange={e => setLname(e.target.value)} placeholder="Lastname" /></div>
                    </div>
                    <div className="row">
                        <div className="col"><input type="email" value={email} required onChange={e => setEmail(e.target.value)} placeholder="Email" /></div>
                    </div>
                    <div className="row">
                        <div className="col"><input type="password" value={password} required onChange={e => setPassword(e.target.value)} placeholder="Password" /></div>
                    </div>
                    <div className="row">
                        <div className="col"><input type="password" value={cnfPassword} required onChange={e => setCnfPassword(e.target.value)} placeholder="Confirm Password" /></div>
                    </div>
                    <div className="row">
                        <div className="col btn can-btn">
                            <input type="submit" name="Register" onClick={() => navigate('/')} value="Cancel" />
                        </div>
                        <div className="col btn">
                            <input type="submit" name="Register" onClick={() => validateRegister()} value="Register" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
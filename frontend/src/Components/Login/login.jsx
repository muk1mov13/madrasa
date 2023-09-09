import React, {useState} from 'react';
import "./login.scss"
import {useDispatch, useSelector} from "react-redux";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";

function Login(props) {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const {isLoading} = useSelector(
        (state) => state.login
    );
    const disptach = useDispatch()

    const handleLogin = () => {
        if (phone !== "" && password !== "") {
            disptach({
                type: "login/loginRequest",
                payload: {
                    phone: phone.trim(),
                    password: password,
                    rememberMe: true
                }
            })
        } else {
            alert("Please fill in all fields")
        }
    }

    return (
        <div className={"my-login"}>
            <div className={"login-container"}>
                <div className={"login-background"}>
                    <form>
                        <h3>Login Here</h3>
                        <label htmlFor="phone">Phone</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text"
                               placeholder="Phone..." id="phone"/>
                        <label htmlFor="password">Password</label>
                        <div className={"password-visible-container"}>
                            <input value={password} onChange={(e) => setPassword(e.target.value)}
                                   type={passwordVisible ? "text" : "password"}
                                   placeholder="Password..." id="password"/>
                            <div className={"password-visible-inner"}
                                 onClick={() => setPasswordVisible(!passwordVisible)}>

                                {
                                    passwordVisible ?
                                        <AiFillEyeInvisible className="passwordVisible"
                                                            size={22}/> :
                                        <AiFillEye size={22} className="passwordDisable"/>
                                }
                            </div>
                        </div>


                        <button onClick={handleLogin} type={"button"} className={"logIn"}>
                            {
                                isLoading ? "Loading..." : "Log In"
                            }

                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
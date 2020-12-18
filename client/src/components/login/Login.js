import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom"
import UserContext from "../../context/UserContext"
import Axios from "axios"
import Signup from '../Signup/Signup'
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()  
  const [modalShow, setModalShow] = useState(false)

  const { setUserData } = useContext(UserContext)
  const history = useHistory()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const loginUser = { email, password }
      const loginRes = await Axios.post(
        "http://localhost:5000/users/login",
        loginUser
      )
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      })
      if(loginRes.data.token) console.log('Logged in')
      localStorage.setItem("auth-token", loginRes.data.token)
      history.push("/")
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg)
    }
  }
  return (
    <>
    <div className="Login-container">
      <form className="form" onSubmit={submit}>
        <div>
        <input
          id="email"
          type="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div>
        <input
          id="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <div>
         <input type="submit" value="Log in" />
        </div>
      </form>
      <button className='Signup' onClick={() => setModalShow(true)}>Create New Account</button> 
    </div>
    <Signup
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default Login;

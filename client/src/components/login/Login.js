import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom"
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const history = useHistory()

  const submit = async (e) => {
    e.preventDefault()
    console.log('Successfully Login...')
  }
  return (
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
      <button>Create New Account</button> 
    </div>
  );
};

export default Login;

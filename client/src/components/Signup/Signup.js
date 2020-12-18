import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import UserContext from "../../context/UserContext"
import Axios from "axios"
import { Button, Modal } from 'react-bootstrap'

const Signup = (props) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [passwordCheck, setPasswordCheck] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [error, setError] = useState()

  const { setUserData } = useContext(UserContext)
  const history = useHistory()

  const submit = async (e) => {
    e.preventDefault()

    try {
      const newUser = { email, password, passwordCheck, firstName, lastName }
      await Axios.post("http://localhost:5000/users/register", newUser)
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      })
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      })
      if(loginRes.data.token) console.log('register')
      localStorage.setItem("auth-token", loginRes.data.token)
      history.push("/")
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg)
    }
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header left closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Signup
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form className="form" onSubmit={submit}>
        <div>
        <input
          id="register-display-name"
          type="text"
          placeHolder="First name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        </div>
        <div>
        <input
          id="register-display-name"
          type="text"
          placeHolder="Last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        </div>
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
        <input
          id="password1"
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        </div>
        <div>
         <input type="submit" className="signup" value="Sign up" />
        </div>
      </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="sr-only">Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Signup

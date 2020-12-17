import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const Signup = (props) => {
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
      <form className="form">
        <div>
        <input
          id="register-display-name"
          type="text"
          placeHolder="First name"
          onChange={(e) => (e.target.value)}
        />
        </div>
        <div>
        <input
          id="register-display-name"
          type="text"
          placeHolder="Last name"
          onChange={(e) => (e.target.value)}
        />
        </div>
        <div>
        <input
          id="email"
          type="email"
          placeholder="Email address"
          onChange={(e) => (e.target.value)}
        />
        </div>
        <div>
        <input
          id="password"
          type="password"
          placeholder="Password"
          onChange={(e) => (e.target.value)}
        />
        </div>
        <div>
        <input
          id="password"
          type="password"
          placeholder="Verify password"
          onChange={(e) => (e.target.value)}
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

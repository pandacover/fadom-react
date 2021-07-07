import "../css/Signup.css";
import { Link, useHistory } from 'react-router-dom';
import { cdb } from './Firebase';
import { useRef, useState } from 'react';
import * as FaIcon from "react-icons/fa";
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup, currentUser } = useAuth();
  const userNameRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    let usernameTaken = false;
    const validUser = /^[a-z0-9_.]+$/.exec(userNameRef.current.value);

    await cdb.collection('userdata').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.id === userNameRef.current.value) {
          usernameTaken = true;
        }
      })
    })

    if (usernameTaken) {
      return setError('Username already taken!');
    } else if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      return setError('Password do not match');
    } else if (!validUser) {
      return setError('Username should be in lowercase and could only contain "." or "_" and numbers in it')
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      await cdb.collection('userdata').doc(userNameRef.current.value).set({
        pictureSrc: "https://cdn4.iconfinder.com/data/icons/one-piece-anime/48/Sed-01-512.png",
        email: emailRef.current.value,
        currentuser: currentUser,
        username: userNameRef.current.value
      });
      history.push("/");

    } catch {
      setError('Failed to create an account') ;
    }
    setLoading(false);
  }
    

  return (
    <div className="form-container">
      <h1 style={{fontWeight: "600"}}>Sign Up</h1><br /><br />
      {error && <Alert variant='danger'>{error}</Alert>}<br /><br /><br />
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Control className="form-item username-box" type="name" ref={userNameRef} placeholder="Username" required={true} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control className="form-item mail-box" type="email" ref={emailRef} placeholder="&#xf0e0;&nbsp;&nbsp;&nbsp;Email" style={{fontFamily: "Open Sans, FontAwesome"}} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control className="form-item password-box" type="password" ref={passwordRef}  placeholder="&#xf023;&nbsp;&nbsp;&nbsp;Password"  style={{fontFamily: "Open Sans, FontAwesome"}} />
        </Form.Group>
        <Form.Group controlId="formConfirmBasicPassword">
          <Form.Control className="form-item confirm-passowrd-box" type="password" ref={passwordConfirmRef} placeholder="&#xf023;&nbsp;&nbsp;&nbsp;Confirm Password"  style={{fontFamily: "Open Sans, FontAwesome"}} />
        </Form.Group>
        <span className="login-txt">Already a member?<Link to="/login"> Login</Link> here.</span><br />
        <Button variant="primary" type="submit" disabled={loading}>
          Sign Up
        </Button><br />
        <span className="login-txt">Or Sign Up Using</span><br />
        <div className="login-links">
          <span className="auth-links"><Link to="/" className="auth"><FaIcon.FaGoogle /></Link></span>
          <span className="auth-links"><Link to="/" className="auth"><FaIcon.FaDiscord /></Link></span>
          <span className="auth-links"><Link to="/" className="auth"><FaIcon.FaGithub /></Link></span>
        </div>
      </Form>
    </div>
  )
}
import { Form, Button } from 'react-bootstrap';
import * as FaIcon from "react-icons/fa";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../css/Signup.css";
import { useRef, useState } from 'react';

export const Login = () => {
  const { login } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to login');
    }
    setLoading(false);
  }

  return (
    <div className="form-container">
      <h1 style={{fontWeight: "600"}}>Login</h1><br /><br />
      { error && <span>{error}</span> }<br /><br />
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control className="form-item mail-box" type="email" ref={emailRef} placeholder="&#xf0e0;&nbsp;&nbsp;&nbsp;Email" style={{fontFamily: "Open Sans, FontAwesome"}} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control className="form-item password-box" type="password" ref={passwordRef} placeholder="&#xf023;&nbsp;&nbsp;&nbsp;Password"  style={{fontFamily: "Open Sans, FontAwesome"}} />
        </Form.Group>
        <span className="login-txt">Not a member?<Link to="/signup"> Sign Up</Link> here.</span><br />
        <Button variant="primary" type="submit" disabled={loading}>
          Login
        </Button><br />
        <span className="login-txt">Or Login Using</span><br />
        <div className="login-links">
          <span className="auth-links"><Link to="/" className="auth"><FaIcon.FaGoogle /></Link></span>
          <span className="auth-links"><Link to="/" className="auth"><FaIcon.FaDiscord /></Link></span>
          <span className="auth-links"><Link to="/" className="auth"><FaIcon.FaGithub /></Link></span>
        </div>
      </Form>
    </div>
  )
}
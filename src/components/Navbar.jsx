import '../css/Navbar.css';
import { useState, useEffect } from 'react';
import { Buttons } from './Buttons';
import { Link } from 'react-router-dom';
import * as IoIcon from "react-icons/io";
import * as FaIcon from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import { cdb } from './Firebase';

export const Navbar = () => {
  const [mode, setMode] = useState(false);
  const { currentUser, logout } = useAuth();
  const [data, setData] = useState([]);
  const toggleMode = () => {
    setMode(!mode);
    document.querySelector('main').classList.toggle('dark');
    console.log(data.name)
  }

  useEffect(() => {
    if (currentUser) {
      const fetch = async () => {
        const query = await cdb.collection('userdata').where('email', '==', currentUser.email).get();
        if(query.empty) {
          return '';
        }
        const data = query.docs[0].data();
        setData({
          picture: data.pictureSrc,
          name: data.username
        })
      }
      fetch();
    }
  }, [currentUser])

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="brand">
          <Link className="nav-link brand-link" to="/">
            <span className="text-link brand-text">ANIMU</span>
            <span className="text-svg brand-svg"><IoIcon.IoIosArrowDropright /></span>
          </Link>
        </li>
        {
          Buttons.map(({ name, classname, icon, path }) => (
            <li className="nav-item" key={name}>
              <Link className={classname} to={path}>
                <span className="text-svg">{icon}</span>
                <span className='text-link'>{name}</span>
              </Link>
            </li>
          ))
        }
        {
          currentUser ?
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                <span className="text-svg"><FaIcon.FaUser /></span>
                <span className="text-link">Profile</span>
              </Link>
            </li> : ""
        }
        <li className="nav-item">
          <Link className="nav-link class-mode" onClick={toggleMode} to="#">
            {mode ? <span className="text-svg"><IoIcon.IoIosMoon /></span> : <span className="text-svg"><IoIcon.IoIosSunny /></span>}
            {mode ? <span className="text-link">DarkMode</span> : <span className="text-link">LightMode</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={currentUser ? '' : '/login'}>
            {currentUser ? <span className="text-svg"><IoIcon.IoMdLogOut /></span> : <span className="text-svg"><IoIcon.IoMdLogIn /></span>}
            {currentUser ? <span className="text-link" onClick={logout}>Logout</span> : <span className="text-link">Login</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={currentUser ? '/profile' : '/login'}>
            <span className="text-svg"><img src={data.picture} alt="unknownImage" style={{width: "2rem", borderRadius: "1rem"}} /></span>
            <span className="text-link">{currentUser ? data.name : ""}</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
import '../css/Profile.css';
import { ProfileButton } from './ProfileButton';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {useState, useRef, useEffect} from 'react';
import { useAuth } from '../context/AuthContext';
import { cdb } from './Firebase';
export const Profile = () => {
  const passwordRef = useRef();
  const pictureRef = useRef();
  const [error, setError] = useState('');
  const [userdata, setUserdata] = useState([]);
  const { currentUser } = useAuth();
  const handleSubmit = e => {
    e.preventDefault();
    try {
      setError('');
    } catch (err) {
      setError(err);
        alert(error)
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const query = await cdb.collection('userdata').where('email', '==', currentUser.email).get();
      const data = query.docs[0].data();
      if (!query) { return ""; }
      
      setUserdata({
        username: data.username,
        picture: data.pictureSrc,
        email: data.email
      });
    }
    fetch();
  })

  return (
    <div className="profile-wrapper">
      <div className="profile-data-left">
        <div className="profile-picture">
          <img src={userdata.picture} alt="Profile" />
        </div>
        <div className="profile-name">
          <span>Profile Name</span>
        </div>
        <hr />
        <div className="profile-post-data">
          <div className="profile-post post-followed">
            <h3>10</h3>
            <span>Post Followed</span>
          </div>
          <div className="profile-post post-liked">
            <h3>5</h3>
            <span>Post Liked</span>
          </div>
        </div>
        <hr />
        <div className="profile-social-media">
          <ul className="social-media-wrapper">
            {
              ProfileButton.map(({id, icon, name}) => (
                <li className="media-item" key={id}>
                  <Link to ='/' className="media-link">
                  <span>{icon}</span>&nbsp;&nbsp;&nbsp;
                  <span>{name}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="profile-data-middle" />
      <div className="profile-data-right">
      <div className="right-data right-top">
        <form className="right-top-data-wrapper" onSubmit={handleSubmit}>
          <li className="right-item"><span>Username:</span>&nbsp;&nbsp;{userdata.username}</li>
          <li className="right-item"><span>Email:</span>&nbsp;&nbsp;{userdata.email}</li>
          <li className="right-item"><span>Profile Picture:</span>&nbsp;&nbsp;<input type="text" placeholder="https://xxx.yyy.zzz" ref={pictureRef} /></li>
          <li className="right-item"><span>Current Password:</span>&nbsp;&nbsp;<input type="password" placeholder="Password" ref={passwordRef} /></li>
          <br />
          <li className="right-item right-button"><Button type="submit">Save</Button></li>
        </form>
      </div>
      <div className="right-middle" />
      <div className="right-data right-bottom">
        <div className="right-bottom-data-wrapper">
          <span>List of Pages Followed</span>
        </div>
      </div> 
      </div>
    </div>
  )
}
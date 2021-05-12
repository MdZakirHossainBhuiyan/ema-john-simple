import './Login.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { handleGoogleSignIn, initializedLoginFrameWork, handleSignOut, handleFbSignIn } from './LoginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializedLoginFrameWork();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const {from} = location.state || {from: {pathname: "/"}};

  const GoogleSignIn = () => {
    handleGoogleSignIn()
    .then(response => {
      setUser(response);
      setLoggedInUser(response);
      history.replace(from);
    })
  }

  const FbSignIn = () =>{
    handleFbSignIn()
    .then(response => {
      setUser(response);
      setLoggedInUser(response);
      history.replace(from);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(response => {
      setUser(response);
      setLoggedInUser(response);
    })
  }

  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    else if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const isPasswordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && isPasswordHasNumber;
    }

    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  // const handleChange = (event) => {
  //   console.log(event.target.name, event.target.value);
  // }

  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      
    }

    if (!newUser && user.email && user.password) {
      
    }

    event.preventDefault();
  }

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> : <button onClick={GoogleSignIn}>Sign in with google</button>
      }

      <button onClick={FbSignIn}>Sign in with facebook</button>

      {
        user.isSignedIn && <div>
          <h1>Welcome, {user.name}</h1>
          <h5>Email: {user.email}</h5>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your name" required />}<br />
        <input type="text" name="email" /*onChange={handleChange}*/ onBlur={handleBlur} placeholder="Your email" required /><br />
        <input type="password" name="password" /*onChange={handleChange}*/ onBlur={handleBlur} placeholder="Your password" required /><br />
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && <p style={{ color: "green" }}>User {newUser ? 'Created' : 'logged in'} Successfully</p>}
    </div>
  );
}

export default Login;

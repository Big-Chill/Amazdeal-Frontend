import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  const handleSubmit = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3001/user/login',
        data: {
          email: email,
          password: password,
          token: localStorage.getItem('token'),
        },
      });
      const token = response.data.token;
      const user = response.data.user;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/');
    }
    catch (err) {
      console.log('Error :- ', err);
    }
    finally {
      setEmail('');
      setPassword('');
    }
  };



  return (
    <div>
      {
        localStorage.getItem('token') ? history.push('/') :
          <div>
            <h1>Login</h1>
            <form>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" onClick={(e) => { e.preventDefault(); handleSubmit(); }}>Submit</button>
            </form>
            <button onClick={() => history.push('/signup')}>Go To Signup</button>
           </div>
      }
    </div>
  )
}

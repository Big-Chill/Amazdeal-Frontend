import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Signup() {
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3001/user/signup',
        data: {
          email: email,
          password: password
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
      <h1>Sign Up</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={(e) => { e.preventDefault(); handleSubmit(); }}>Submit</button>
      </form>
      <button onClick={() => history.push('/login')}>Go To Login</button>
    </div>
  )
}

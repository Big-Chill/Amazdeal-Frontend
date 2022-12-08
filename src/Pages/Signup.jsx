import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Signup() {
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  



  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={() => history.push('/login')}>Go To Login</button>
    </div>
  )
}

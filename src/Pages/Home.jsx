import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


export default function Home() {
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('user')));
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/login');
  };


  return (
    <>
      <h1> Home Page</h1>
      <h2> Welcome {userDetails.name}</h2>
      <h3> Your Email is {userDetails.email}</h3>
      <h3> Your Id is {userDetails._id}</h3>
      <button onClick={() => history.push('/imagepage')}>View Images</button>
      <button onClick={() => history.push('/imgupload')}>Upload Image</button>
      <button onClick={() => history.push('/sellerform')}>Register as Seller</button>
      <button onClick={() => history.push('/addresspage')}>View Addresses</button>
      <button onClick={() => history.push('/addressformpage')}>Add Address</button>
      <button onClick={logout}>Logout</button>
    </>
  )
}

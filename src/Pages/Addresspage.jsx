import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Addresspage() {
  const [addresses, setAddresses] = useState([]);

  const fetchAddresses = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `http://localhost:3001/address/get-all-addresses/${JSON.parse(localStorage.getItem('user'))._id}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Response :- ', response);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  React.useEffect(() => {
    fetchAddresses();
  }, [])


  return (
    <div>
      <h1>Address Page</h1>
    </div>
  )
}

import React, { useState } from 'react';
import axios from 'axios';

export default function SellerForm() {

  const [fname, setFname] = useState('');
  const [mname, setMname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [shopaddress, setShopaddress] = useState('');
  const [shopname, setShopname] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3001/seller/create-seller',
        data: {
          firstName: fname,
          lastName: lname,
          email: email,
          shopAddress: shopaddress,
          shopName: shopname,
          user_id: JSON.parse(localStorage.getItem('user'))._id
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log('Response frm server is: ', response);
    } catch (error) {
      console.log('Error is: ', error);
    }
  };



  return (
    <div>
      <h1> Seller Form</h1>
      <form>
        <label htmlFor="fname">First Name</label>
        <input type="text" id="fname" name="fname" placeholder="Your name.." value={fname} onChange={(e) => setFname(e.target.value)} />
        <label htmlFor="lname">Last Name</label>
        <input type="text" id="lname" name="lname" placeholder="Your last name.." value={lname} onChange={(e) => setLname(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Your email.." value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="shopaddress">Shop Address</label>
        <input type="text" id="shopaddress" name="shopaddress" placeholder="Your shop address.." value={shopaddress} onChange={(e) => setShopaddress(e.target.value)} />
        <label htmlFor="shopname">Shop Name</label>
        <input type="text" id="shopname" name="shopname" placeholder="Your shop name.." value={shopname} onChange={(e) => setShopname(e.target.value)} />
        <button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </div>
  )
}

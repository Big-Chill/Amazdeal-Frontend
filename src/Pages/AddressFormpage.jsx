import React, { useState } from 'react';
import axios from 'axios';

export default function AddressFormpage() {
  const [country, setCountry] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [address_line_1, setAddress_line_1] = useState('');
  const [address_line_2, setAddress_line_2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [addressType, setAddressType] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:3001/address/create-address',
        data: {
          country: country,
          fullName: fullName,
          mobileNumber: mobileNumber,
          pincode: pincode,
          address_line_1: address_line_1,
          address_line_2: address_line_2,
          landmark: landmark,
          city: city,
          state: state,
          address_type: addressType,
          is_default_address: isDefault,
          user_id: JSON.parse(localStorage.getItem('user'))._id
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log('Response: ', response);
    } catch (error) {
      console.log('Error: ', error);
    }
  };



  return (
    <div>
      <h1>Address Form Page</h1>
      <form>
        <label htmlFor="country">Country</label>
        <input type="text" name="country" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
        <label htmlFor="fullName">Full Name</label>
        <input type="text" name="fullName" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <label htmlFor="mobileNumber">Mobile Number</label>
        <input type="text" name="mobileNumber" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
        <label htmlFor="pincode">Pincode</label>
        <input type="text" name="pincode" id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
        <label htmlFor="address_line_1">Address Line 1</label>
        <input type="text" name="address_line_1" id="address_line_1" value={address_line_1} onChange={(e) => setAddress_line_1(e.target.value)} />
        <label htmlFor="address_line_2">Address Line 2</label>
        <input type="text" name="address_line_2" id="address_line_2" value={address_line_2} onChange={(e) => setAddress_line_2(e.target.value)} />
        <label htmlFor="landmark">Landmark</label>
        <input type="text" name="landmark" id="landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
        <label htmlFor="city">City</label>
        <input type="text" name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
        <label htmlFor="state">State</label>
        <input type="text" name="state" id="state" value={state} onChange={(e) => setState(e.target.value)} />
        <label htmlFor="addressType">Address Type</label>
        <input type="text" name="addressType" id="addressType" value={addressType} onChange={(e) => setAddressType(e.target.value)} />
        <label htmlFor="isDefault">Is Default</label>
        <input type="checkbox" name="isDefault" id="isDefault" onChange={(e) => setIsDefault(e.target.checked)} />
        <button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </div>
  )
}

import React, { useState } from 'react';
import axios from 'axios';
import {Link,useHistory} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';


export default function Address() {
  const history = useHistory();
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
      history.push('/');
    } catch (error) {
      console.log('Error: ', error);
    }
  };


  return (
    <div>
      <Card sx={{ maxWidth: 645, height: "950px", border: 5, borderColor: "#fafafa", borderRadius: 7, boxShadow: 20, bgcolor: "#edf7fa", mb: "12%" }} className="form-card">
        <div className="name-field">
          <TextField id="outlined-basic" label="Full Name" variant="outlined" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <TextField id="outlined-basic" label="Mobile Number" variant="outlined" sx={{ml:"8%"}} value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
        </div>
        <div className="address-field">
          <TextField id="outlined-basic" sx={{ width: 490 }} label="Address Line 1" variant="outlined" value={address_line_1} onChange={(e) => setAddress_line_1(e.target.value)} multiline rows={2}/>
        </div>
        <div className="address-field">
          <TextField id="outlined-basic" sx={{ width: 490 }} label="Address Line 2" variant="outlined" value={address_line_2} onChange={(e) => setAddress_line_2(e.target.value)} multiline rows={2}/>
        </div>
        <div className="address-field">
          <TextField id="outlined-basic" sx={{ width: 490 }} label="Landmark" variant="outlined" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
        </div>
        <div className="address-field">
          <TextField id="outlined-basic" label="City" variant="outlined" value={city} onChange={(e) => setCity(e.target.value)} />
          <TextField id="outlined-basic" label="State" variant="outlined" sx={{ ml: "8%" }} value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <div className="address-field">
          <TextField id="outlined-basic" label="Country" variant="outlined" value={country} onChange={(e) => setCountry(e.target.value)} />
          <TextField id="outlined-basic" label="Pincode" variant="outlined" sx={{ ml: "8%" }} value={pincode} onChange={(e) => setPincode(e.target.value)} />
        </div>
        <div className="address-field">
          <TextField id="outlined-basic" label="Address Type" variant="outlined" value={addressType} onChange={(e) => setAddressType(e.target.value)} />
          <span>
            Set as default address
            <Checkbox
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </span>
        </div>
        <div className="address-field">
          <Button variant="contained" onClick={handleSubmit} sx={{borderRadius:10, maxWidth:200, ml:"41%",mb:"6%",my:"4%", backgroundColor:"#ff487e"}}>Save</Button>
        </div>
      </Card>
    </div>
  )
}

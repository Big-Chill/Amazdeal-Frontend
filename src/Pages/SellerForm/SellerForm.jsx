import React,{useState,useEffect,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';



export default function SellerForm() {

    const history=useHistory();
    const[fname,setfname]=useState("");
    const[lname,setlname]=useState("");
    const[email,setEmail]=useState("");
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
      history.push('/');
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.reload();
      console.log('Response frm server is: ', response);
    } catch (error) {
      console.log('Error is: ', error);
    }
  };


  return (
    <div>
      <Card sx={{ maxWidth: 645, height:"550px", border:5, borderColor:"#fafafa", borderRadius:7, boxShadow: 20, bgcolor:"#edf7fa", mb:"12%" }} className="form-card">
        <div className="name-field">
         <TextField id="outlined-basic" label="First Name" variant="outlined" required value={fname} onChange={(e)=>setfname(e.target.value)}/>
         <TextField id="outlined-basic" label="Last Name" variant="outlined" sx={{ml:"8%"}} required value={lname} onChange={(e)=>setlname(e.target.value)}/>
        </div>
        <div className="email-field">
          <TextField label="Email ID" sx={{width:490}} required value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="shop-field">
          <TextField label="Shop Name" sx={{ width: 490 }} required value={shopname} onChange={(e) => setShopname(e.target.value)} />
        </div>
        <div className="address-field">
          <TextField label="Shop Address" sx={{ width: 490 }} required value={shopaddress} onChange={(e) => setShopaddress(e.target.value)} multiline rows={4} />
        </div>
        <Button variant="contained" sx={{borderRadius:10, maxWidth:200, ml:"41%",mb:"6%",my:"4%", backgroundColor:"#ff487e"}} onClick={handleSubmit}>Submit</Button>
      </Card>
    </div>
  )
}

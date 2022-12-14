import React,{useState,useEffect,useContext} from 'react';
import { sizing } from '@mui/system';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';


export default function Signup() {

  const history=useHistory();
  const[email,setEmail]=useState("");
  const [password, setPassword] = useState("");
  
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
      localStorage.setItem('isLoggedIn', true);
      history.push('/');
      window.location.reload();
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
    <div className="login-div">

      <Card sx={{ maxWidth: 445, height:"550px", border:5, borderColor:"#fafafa", borderRadius:7, boxShadow: 20, bgcolor:"#f2f2f2" }} className="signup-card">
            <CardContent>
            <Typography variant="h4" gutterBottom component="div" align="center" sx={{mt:"13.5%", mb:"12%"}}>SIGN UP</Typography>
            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="medium" sx={{mb:"8%"}} value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <TextField type="password" id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="medium" sx={{mb:"8%"}} value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <FormGroup>
                <FormControlLabel control={<Checkbox/>} label={<Typography variant="caption">I read and agree to Terms and Conditions</Typography>} sx={{ml:"15%", mb:"6%"}}/>
                <Button variant="contained" sx={{borderRadius:10, maxWidth:200, ml:"25%",mb:"6%"}} onClick={(e) => { e.preventDefault(); handleSubmit(); }}>Sign Up</Button>
            </FormGroup>
            <Typography variant="subtitle2" sx={{ml:"25%"}}>
                  Alread have an account?<Link to="/login">Log In</Link>
            </Typography>
            </CardContent>
        </Card>

    </div>
  );
}
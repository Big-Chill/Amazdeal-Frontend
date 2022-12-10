import React,{useState,useEffect,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import axios from 'axios';



export default function ImageUpload() {

    const history = useHistory();
    const [image, setImage] = React.useState(null);
    const [imgname, setImgname] = React.useState('');
    const [mrp, setMrp] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [stock, setStock] = React.useState('');
  
    const uploadImage = (e) => {
    e.preventDefault();
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image.data);
    const imgDetails = {
      "name": imgname,
      "mrp": mrp,
      "price": price,
      "description": description,
      "category": category,
      "brand": brand,
      "stock": stock,
      "uploadedBy": JSON.parse(localStorage.getItem('user')).email,
      "user_id": JSON.parse(localStorage.getItem('user'))._id
    }
    formData.append('imgDetails', JSON.stringify(imgDetails));

    try {
      const resp = await axios({
        method: 'POST',
        url: 'http://localhost:3001/image/upload',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      console.log('Response :- ', resp);
      history.push('/');
    } catch (error) {
      console.log('Error :- ', error);
    }
    finally {
      setImage(null);
      setImgname('');
      setMrp('');
      setPrice('');
      setDescription('');
      setCategory('');
      setBrand('');
      setStock('');
    }
  };



  return (
    <div>
      <Card sx={{ maxWidth: 645, height:"920px", border:5, borderColor:"#fafafa", borderRadius:7, boxShadow: 20, bgcolor:"#edf7fa", my: '-0.5%' }} className="form-card">
        <div className="name-field">
          <TextField id="outlined-basic" label="Product Name" variant="outlined" required value={imgname} onChange={(e)=>setImgname(e.target.value)}/>
          <TextField id="outlined-basic" label="MRP" variant="outlined" sx={{ml:"8%"}} required value={mrp} onChange={(e)=>setMrp(e.target.value)}/>
        </div>
        <div className="email-field">
          <TextField label="Price" sx={{width:490}} required value={price} onChange={(e)=>setPrice(e.target.value)}/>
        </div>
        <div className="shop-field">
          <TextField label="Description" sx={{ width: 490 }} required value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={4}/>
        </div>
        <div className="address-field">
          <TextField label="Category" sx={{ width: 490 }} required value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="address-field">
          <TextField label="Brand" sx={{ width: 490 }} required value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>
        <div className="address-field">
          <TextField label="Stock" sx={{ width: 490 }} required value={stock} onChange={(e) => setStock(e.target.value)} />
        </div>
        <div className="address-field">
          <Button variant="contained" component="label" sx={{ width: 490, mt: 2, mb: 2, bgcolor: "#fafafa", color: "#000000", border: 1, borderColor: "#000000", borderRadius: 2 }}>
            <FileUploadIcon sx={{ mr: 1 }} />
            <input type="file" hidden accept="image/*" name="image" onChange={(e) => uploadImage(e)} />
          </Button>
        </div>
        <div className="address-field">
          <Button variant="contained" sx={{ width: 100, mt: -1, mb: 2, ml: '34%', bgcolor: "#fafafa", color: "#000000", border: 1, borderColor: "#000000", borderRadius: 2 }} onClick={(e) => submitImage(e)}> Upload </Button>
        </div>
      </Card>
    </div>
  )
}

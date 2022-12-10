import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Imgupload() {
  const [imgname, setImgname] = React.useState('');
  const [mrp, setMrp] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [stock, setStock] = React.useState('');



  const [image, setImage] = React.useState(null);
  const history = useHistory();

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
      history.push('/imagepage');
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
      <h1>Image Upload</h1>
      {
        image && (
          <img src={image.preview} alt="preview" style={{ width: '300px', height: '300px' }} />
        )
      }
      <form onSubmit={(e) => submitImage(e)}>
        <input type="file" onChange={(e) => uploadImage(e)} name="image" />
        <input type="text" name="name" placeholder="Enter name of the product" onChange={(e) => setImgname(e.target.value)} />
        <input type="text" name="mrp" placeholder="Enter mrp of the product" onChange={(e) => setMrp(e.target.value)} />
        <input type="text" name="price" placeholder="Enter price of the product" onChange={(e) => setPrice(e.target.value)} />
        <input type="text" name="description" placeholder="Enter description of the product" onChange={(e) => setDescription(e.target.value)} />
        <input type="text" name="category" placeholder="Enter category of the product" onChange={(e) => setCategory(e.target.value)} />
        <input type="text" name="brand" placeholder="Enter brand of the product" onChange={(e) => setBrand(e.target.value)} />
        <input type="text" name="stock" placeholder="Enter stock of the product" onChange={(e) => setStock(e.target.value)} />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}

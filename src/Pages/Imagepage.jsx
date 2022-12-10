import React,{ useEffect,useState } from 'react';
import axios from 'axios';

export default function Imagepage() {

  const [image, setImage] = useState(null);
  
  const fetchImages = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3001/image/products',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      console.log('Response data is: ', response.data);
      setImage(response.data.data);
    } catch (error) {
      console.log('Error is: ', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [])

  return (
    <div>
      <h1> Image will be displayed here</h1>
      {
        image && image.map((img) => {
          return (
            <div>
              <img src={img.filePath} alt="image" style={{ width: '40%', height: '40%' }} />
            </div>
          )
        })
      }
    </div>
  )
}

import React, { useState } from 'react';
import Banner from '../../Components/Banner/Banner';
import Card from '../../Components/Card/Card';
import axios from 'axios';


export default function Home() {

  const [images, setImages] = useState([]);

  const getImages = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3001/image/products',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      setImages(response.data.data);
    } catch (error) {
      console.log('Error is: ', error);
    }
  };

  React.useEffect(() => {
    getImages();
  }, []);




  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {
          images && images.map((image, index) => {
            return <Card key={index} image={image.filePath} title={image.name} price={image.price} allDetails={image} />
          })
        }
      </div>
    </div>
  )
}

import React, { useState } from 'react';
import Banner from '../../Components/Banner/Banner';
import Card from '../../Components/Card/Card';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function SearchResult() {

  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery'));

  React.useEffect(() => {
    setImages(JSON.parse(localStorage.getItem('searchResults')));
  }, [localStorage.getItem('searchResults')]);



  return (
    <div>
      {
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {
              JSON.parse(localStorage.getItem('searchResults')).map((image, index) => {
                return <Card key={index} image={image.filePath} title={image.name} price={image.price} allDetails={image} />
              })
            }
          </div>
      }
    </div>
  );
}
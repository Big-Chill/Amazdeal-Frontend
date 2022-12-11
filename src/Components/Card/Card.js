import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Card({ image, title, price, allDetails }) {

  const history = useHistory();

  const addToCart = () => {
    let existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (existingCart.length === 0) {
      let newDetails = { ...allDetails, quantity: 1 };
      existingCart.push(newDetails);
      localStorage.setItem('cart', JSON.stringify(existingCart));
    } else {
      let flag = 0;
      existingCart.forEach((item) => {
        if (item._id === allDetails._id) {
          item.quantity += 1;
          flag = 1;
        }
      });
      if (flag === 0) {
        let newDetails = { ...allDetails, quantity: 1 };
        existingCart.push(newDetails);
      }
      localStorage.setItem('cart', JSON.stringify(existingCart));
    }
    history.push('/cart');
    window.location.reload();
  };


  return (
    <div style={{ height: '60vh' }}>
      <div className="container">
  <div className="card">
    <img
      src={image}
      alt=""
    />
    <div className="card-body">
      <div className="row">
        <div className="card-title">
            <h4>{title}</h4>
          <h3>₹ {price}</h3>
        </div>
      </div>
      <hr />
      <div className="btn-group">
        <div className="btn">
          <button className="btn btn-primary" onClick={addToCart}> Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

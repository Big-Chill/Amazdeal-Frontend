import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


export default function Cart() {

  const history = useHistory();
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const removeProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
    localStorage.setItem('cart', JSON.stringify(newProducts));
    window.location.reload();
  };

  const calculateTotalQuantity = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.quantity;
    });
    setTotalQuantity(total);
  };

  const purchaseItems = async() => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3001/order/save',
        data: {
          user_id: JSON.parse(localStorage.getItem('user'))._id,
          email: JSON.parse(localStorage.getItem('user')).email,
          items: products,
          total: totalQuantity
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      console.log("Response: ", response);
      localStorage.setItem('cart', JSON.stringify([]));
      history.push('/');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(products));
    calculateTotalQuantity();
  }, [products]);


  return (
    <Table striped bordered hover variant="primary">
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          products.map((product, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><img src={product.filePath} alt={product.name} style={{ width: '100px' }} /></td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.price * product.quantity}</td>
                <td>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={product.quantity}
                      label="Quantity"
                      onChange={(e) => {
                        const newProducts = [...products];
                        newProducts[index].quantity = e.target.value;
                        setProducts(newProducts);
                      }}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <button onClick={() => removeProduct(index)} className="btn btn-danger">Remove</button>
                </td>
              </tr>
            )
          })
        }
        {
          products.length > 0 &&
          <tr>
          <td colSpan="5" style={{ textAlign: 'right' }}>Total Cost</td>
          <td colSpan="3" style={{ textAlign: 'left' }}>
            {
              products.reduce((acc, curr) => {
                return acc + curr.price * curr.quantity;
              }, 0)
            }
            <button onClick={purchaseItems} className="btn btn-success" style={{ marginLeft: '10vw' }}>Purchase</button>
          </td>
        </tr>
        }
      </tbody>
    </Table>
  );
}

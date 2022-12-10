import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

export default function Order() {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:3001/order/get/${JSON.parse(localStorage.getItem('user'))._id}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const orders = response.data.data;

      let allOrders = [];
      orders.map((order) => {
        order.items.map((item) => {
          allOrders.push(item);
        });
      });

      console.log('All orders are: ', allOrders);
      setOrders(allOrders);
    } catch (error) {
      console.log('Error is: ', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);




  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map((order, index) => {
              return (
                <tr key={index}>
                  <td><img src={order.filePath} alt={order.name} width="100" height="100" /></td>
                  <td>{order.name}</td>
                  <td>{order.quantity}</td>
                  <td>{order.price * order.quantity}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

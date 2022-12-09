import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


export default function Home() {

  const [people, setPeople] = useState([]);

  const history = useHistory();

  const getData = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3001/all',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPeople(response.data.data);
    }
    catch (error) {
      console.log('Error :- ');
      console.log(error);
    }
  };

  const deleteRow = async (id) => {
    try {
      await axios({
        method: 'delete',
        url: `http://localhost:3001/delete/${id}`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.log('Error :- ');
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/login');
  };


  React.useEffect(() => {
    getData();
  }, [people])





  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10%'}}>
      <table >
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            people.map((person, index) => {
              return (
                <tr key={index} id={person._id}>
                  <td>{person.firstName}</td>
                  <td>{person.lastName}</td>
                  <td>{person.age}</td>
                  <td><button onClick={(e) => history.push(`/individual/${person._id}`)} style={{ cursor: 'pointer' }}>Show</button></td>
                  <td><button onClick={() => deleteRow(person._id)}>Delete</button></td>
                </tr>
              )
            })
          }
          </tbody>
      </table>
      <button
        onClick={() => history.push('/form')}
        style={{ marginTop: '5%' }}
      >Add New</button>
      <button
        style={{ marginTop: '5%' }}
        onClick={logout}
      >Log Out</button>
    </div>
  )
}

import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


export default function Home() {

  const [people, setPeople] = useState([]);

  const history = useHistory();

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/all');
      setPeople(response.data.data);
    }
    catch (error) {
      console.log('Error :- ');
      console.log(error);
    }
  };


  React.useEffect(() => {
    getData();
  }, [])





  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10%'}}>
      <table >
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {
            people.map((person, index) => {
              return (
                <tr key={index} id={person._id} onClick={(e) => history.push(`/individual/${person._id}`)} style={{ cursor: 'pointer' }}>
                  <td>{person.firstName}</td>
                  <td>{person.lastName}</td>
                  <td>{person.age}</td>
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
      >Log Out</button>
    </div>
  )
}

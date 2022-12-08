import React from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

export default function Individual() {
 
  const history = useHistory();
  const { id } = useParams();
  const [person, setPerson] = React.useState({});

  const fetchData = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:3001/individual/${id}`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPerson(response.data);
    }
    catch (error) {
      console.log('Error :- ');
      console.log(error);
    }
  };


  React.useEffect(() => {
    fetchData();
  }, [])




  return (
    <div>
      <h3>First Name :- {person.firstName}</h3>
      <h3>Last Name :- {person.lastName}</h3>
      <h3>Age :- {person.age}</h3>
      <button
        onClick={() => history.push(`/form/${id}`, { firstName: person.firstName, lastName: person.lastName, age: person.age })}
        style={{ marginTop: '5%' }}
        >
        Edit
      </button>
    </div>
  )
}

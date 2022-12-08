import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation, useParams } from 'react-router-dom';

export default function Form(props) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');

  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();


  React.useEffect(() => {
    if (location.state) {
          setFirstName(location.state.firstName);
          setLastName(location.state.lastName);
          setAge(location.state.age);
      }
  }, [location.state])


  const addData = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: 'post',
        url: 'http://localhost:3001/new',
        data: {
          firstName: firstName,
          lastName: lastName,
          age: age,
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      history.push('/');
    }
    catch (error) {
      console.log('Error :- ');
      console.log(error);
    }
    finally {
      setFirstName('');
      setLastName('');
      setAge('');
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: 'put',
        url: `http://localhost:3001/update/${id}`,
        data: {
          firstName: firstName,
          lastName: lastName,
          age: age,
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      history.push('/');
    }
    catch (error) {
      console.log('Error :- ');
      console.log(error);
    }
    finally {
      setFirstName('');
      setLastName('');
      setAge('');
    }
  };






  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10%', justifyContent: 'space-even'}}>
      <form>
        <label>
          First Name:
          <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          Age:
          <input type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        {
          location.state ?
            <input type="submit" value="Update" onClick={(e) => updateData(e)} />
            :
            <input type="submit" value="Submit" onClick={(e) => addData(e)} />
        }
      </form>
      <button
        onClick={() => history.push('/')}
        style={{ marginTop: '3%' }}
      >
        Go Back
      </button>
    </div>
  )
}

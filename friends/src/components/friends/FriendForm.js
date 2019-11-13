import React, { useState } from 'react';
import axios from 'axios';

const axiosWithAuth = () => {
  return axios.create({
    headers: {
      authorization: localStorage.getItem('token')
    }
  })
}

const FriendForm = props => {
  console.log(props);
  const [user, setUser] = useState({
    name: '',
    age: '',
    email: ''
  })

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const saveChanges = e => {
    e.preventDefault();
    axiosWithAuth().put(`http://localhost:5000/api/friends/${props.id}`, {
       id: props.id, 
       name: user.name, 
       age: user.age, 
       email: user.email 
  })
    .then(res => {
      console.log(res);
      props.updateFriends(res.data)
    })
  }

  return (
    <form onSubmit={saveChanges}>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="age"
        value={user.age}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <button>Save</button>
    </form>
  );
};

export default FriendForm;
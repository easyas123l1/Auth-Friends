import React from 'react';
import axios from 'axios';

const axiosWithAuth = () => {
  return axios.create({
    headers: {
      authorization: localStorage.getItem('token')
    }
  })
}

const Friend = (props) => {
  console.log(props);
  const removeFriend = e => {
    e.preventDefault();
    axiosWithAuth().delete(`http://localhost:5000/api/friends/${props.friend.id}`)
    .then(res => {
      console.log(res);
      props.updateFriends(res.data);
    })
  }
  return (
    <>
      <h1>Name: {props.friend.name}</h1>
      <h1>Age: {props.friend.age}</h1>
      <h1>Email: {props.friend.email}</h1> 
      <button onClick={removeFriend}>Remove Friend</button>
    </>
  );
};

export default Friend;
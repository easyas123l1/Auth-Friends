import React from 'react';

const Friend = ({friend: {name,age,email}}) => {
  return (
    <>
      <h1>Name: {name}</h1>
      <h1>Age: {age}</h1>
      <h1>Email: {email}</h1> 
    </>
  );
};

export default Friend;
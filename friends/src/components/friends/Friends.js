import React, { Component } from 'react';
import axios from 'axios';

import Friend from './Friend';

const axiosWithAuth = () => {
  return axios.create({
    headers: {
      authorization: localStorage.getItem('token')
    }
  })
}

class Friends extends Component {
  state = {
    friends: [],
    id: ''
  }

  componentDidMount() {
    this.getData();
    if (localStorage.getItem('token')) {
      console.info('Logged In!');
    } else {
      console.error('Please Login');
    }
  }

  getData = () => {
    axiosWithAuth()('http://localhost:5000/api/friends', {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(res => {
      console.log(res)
      this.setState({ friends: res.data })
    })
  }

  getById = id => {
    axiosWithAuth()(`http://localhost:5000/api/friends/${id}`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(res => {
      console.log(res);
      this.setState({ friends: res.data })
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <>
        <form onSubmit={this.getById}>
          <input 
          type='text'
          name='id'
          value= {this.state.id}
          onChange = {this.handleChange}
          />
        </form>
        <div>
          <h1>INSIDE FRIENDS :D</h1>  
          {this.state.friends.map(friend => (
            <Friend key={friend.id} friend={friend}/>        
          ))}
        </div>
      </>
    );
  }
};

export default Friends;
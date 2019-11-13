import React, { Component } from 'react';
import axios from 'axios';

import Friend from './Friend';
import FriendForm from './FriendForm';

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
    id: '',
    name: '',
    age: '',
    email: ''
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
    console.log(axiosWithAuth)
    axiosWithAuth()('http://localhost:5000/api/friends', {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(res => {
      console.log(res)
      this.setState({ friends: res.data })
      console.log(this.state.friends);
    })
  }

  getById = e => {
    e.preventDefault();
    let id = this.state.id;
    axiosWithAuth()(`http://localhost:5000/api/friends/${id}`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(res => {
      console.log(res);
      this.setState({ friends: res.data })
    })
  }

  getAllData = e => {
    e.preventDefault();
    this.getData();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  updateFriends = array => {
    this.setState({ friends: array })
  }

  saveChanges = e => {
    e.preventDefault();
    axiosWithAuth().post(`http://localhost:5000/api/friends/`, {
      id: this.state.id, 
      name: this.state.name, 
      age: this.state.age, 
      email: this.state.email 
 })
   .then(res => {
     console.log(res);
     this.updateFriends(res.data)
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
          <button>Search by ID</button>
        </form>
        <form onSubmit={this.saveChanges}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="age"
            value={this.state.age}
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <button>Add Friend</button>
        </form>
        <button onClick={this.getAllData}>Get all Friends</button>
        <div>
          {this.state.friends[0] ?
          this.state.friends.map(friend => (
            <Friend key={friend.id} friend={friend} updateFriends={this.updateFriends} />        
          ))
        :
        <>
          <Friend friend={this.state.friends} updateFriends={this.updateFriends} />
          <FriendForm id={this.state.friends.id} updateFriends={this.updateFriends}/>
        </>
        }
        </div>
      </>
    );
  }
};

export default Friends;
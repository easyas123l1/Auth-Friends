import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  state = {
    credentials: {
      username: '',
      password: ''
    },
    isLoggedIn: false
  }

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    })
  }

  login = e => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/login`, this.state.credentials)
    .then(response => {
      console.log('response', response);
      const {data} = response;

      localStorage.setItem('token', data.payload)
      this.setState({ ...this.state, isLoggedIn: true})
    })
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({ ...this.state, isLoggedIn: true });
    } else {
      this.setState({ ...this.state, isLoggedIn: false })
    }
  }

  render() {
    return (
      <div>
        <h2>{this.state.isLoggedIn ? "LOGGED IN!" : "Please login"}</h2>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
};

export default Login;
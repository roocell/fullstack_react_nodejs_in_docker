import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {users: [],
           markers: []
          }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
    fetch('/markers')
      .then(res => res.json()) 
      .then(markers => this.setState({ markers }));
  }

  render() {
    return (

      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )} 
        <h1> Markers </h1>
        {this.state.markers.map(marker =>
          <div key={marker.id}>{marker.lat}</div>
        )}
      </div>
    );
  }
}

export default App;

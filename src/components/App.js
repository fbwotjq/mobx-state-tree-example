import React, { Component } from 'react';
import logo from '../assets/santa-claus.png';

import WishListView from './WishListView'

class App extends Component {

  constructor(props) {
    super()
    this.state = { selectedUser: null }
  }

  onSelectUser = event => {
    this.setState({ selectedUser: event.target.value })
  }

  render() {

    const { group } = this.props
    console.log(group.users);
    const selectedUser = group.users.get(this.state.selectedUser)

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">WishList</h1>
        </header>
        <select onChange={this.onSelectUser}>
          <option>- Select user -</option>
          {
            Array.from(group.users.values()).map(user =>
              <option key={user.id} value={user.id}>{user.name}</option>
            )
          }
        </select>
        { /* <WishListView wishList={this.props.wishList}/> */ }
        { selectedUser && <WishListView wishList={selectedUser.wishList}/> }
      </div>
    );
  }
}

export default App;

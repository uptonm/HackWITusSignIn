import React, { Component } from "react";
import { fetchUsers, putUser } from "../actions/index";

class Organizer extends Component {
  state = {
    users: []
  };

  componentDidMount = () => {
    this.refreshUsers();
  };

  contains = user => {
    let exists = false;
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i]._id === user._id) {
        exists = true;
      }
    }
    return exists;
  };

  async setSwag({ _id }) {
    const data = { swagRedeemed: true };
    this.state.users.map(user => {
      if (user._id === _id) {
        user.swagRedeemed = true;
        this.forceUpdate();
      }
      return true;
    });
    await putUser(_id, data);
  }

  refreshUsers = async () => {
    const res = await fetchUsers();
    res.forEach(user => {
      if (!this.contains(user)) {
        this.setState({ users: [...this.state.users, user] });
      }
    });
  };

  renderUsers = () => {
    return this.state.users.map(user => {
      return (
        <tr key={user._id}>
          <td>{user.email}</td>
          <td>{user.first}</td>
          <td>{user.last}</td>
          <td>{user.school}</td>
          <td>{user.major}</td>
          <td>{user.phone}</td>
          <td>
            {user.swagRedeemed === false ? (
              <button
                id={this._id}
                className="btn btn-sm btn-success"
                onClick={this.setSwag.bind(this, user)}
              >
                Redeem
              </button>
            ) : (
                <span>Swag Redeemed</span>
              )}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container">
        <h1 className="display-1 text-center">Hackers</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">School</th>
              <th scope="col">Major</th>
              <th scope="col">Phone</th>
              <th scope="col">Swag</th>
            </tr>
          </thead>
          <tbody>{this.renderUsers()}</tbody>
        </table>
        <button className="btn btn-success float-left" onClick={this.refreshUsers}>
          <i className="fas fa-sync" style={{ marginRight: '0.5em' }} />
          Refresh
        </button>
      </div>
    );
  }
}

export default Organizer;

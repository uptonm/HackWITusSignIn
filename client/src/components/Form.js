import React, { Component } from "react";
import { connect } from "react-redux";
import { putUser } from "../actions/index";
import "bootstrap/dist/css/bootstrap.min.css";

const Input = ({ id, label, placeholder, value, onChange }) => {
  return (
    <div key={id} className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={id === "email" ? "email" : "text"}
        className="form-control"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const SelectInput = ({ id, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <select
        className="form-control"
        id={id}
        value={value}
        onChange={onChange}
      >
        <option value="wit">Wentworth Institute of Technology</option>
        <option value="northeastern">Northeastern University</option>
        <option value="massart">MassArt</option>
        <option value="mcphs">MCPHS</option>
        <option value="simmons">Simmons University</option>
        <option value="emmanuel">Emmanuel University</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};
class Form extends Component {
  state = {
    first: {
      id: "first",
      label: "First Name",
      placeHolder: "Enter First Name",
      value: ""
    },
    last: {
      id: "last",
      label: "Last Name",
      placeHolder: "Enter Last Name",
      value: ""
    },
    email: {
      id: "email",
      label: "Email",
      placeHolder: "Enter Email",
      value: ""
    },
    school: {
      id: "school",
      label: "School",
      placeHolder: "Enter School",
      value: "",
      other: ""
    },
    major: {
      id: "major",
      label: "Major",
      placeHolder: "Enter Major",
      value: ""
    },
    doOnce: 0
  };

  onSubmit = async event => {
    event.preventDefault();
    // console.log(this.props.auth);
    const { first, last, email, school, major } = this.state;
    const data = {
      first: first.value,
      last: last.value,
      email: email.value,
      school: school.value !== "other" ? school.value : school.other,
      major: major.value
    };
    console.log(data);
    await putUser(this.props.auth._id, data);
  };

  renderContent() {
    this.setState({
      first: {
        ...this.state.first,
        value: this.props.auth.first
      },
      last: {
        ...this.state.last,
        value: this.props.auth.last
      },
      email: {
        ...this.state.email,
        value: this.props.auth.email
      },
      school: {
        ...this.state.school,
        value: this.props.auth.school
      }
    });
  }

  componentWillReceiveProps = () => {
    switch (this.props.auth) {
      case null:
        break;
      case false:
        break;
      default:
        this.renderContent();
    }
  };

  renderFields = () => {
    switch (this.props.auth) {
      case null:
        return <div>Loading...</div>;
      case false:
        return <div>Logged Out</div>;
      default:
        if (this.state.doOnce === 0) {
          this.renderContent();
          this.setState({ doOnce: this.state.doOnce + 1 });
        }
        return (
          <div>
            <Input
              id={this.state.first.id}
              label={this.state.first.label}
              placeholder={this.state.first.placeHolder}
              value={this.state.first.value}
              onChange={event =>
                this.setState({
                  first: {
                    ...this.state.first,
                    value: event.target.value
                  }
                })
              }
            />
            <Input
              id={this.state.last.id}
              label={this.state.last.label}
              placeholder={this.state.last.placeHolder}
              value={this.state.last.value}
              onChange={event =>
                this.setState({
                  last: {
                    ...this.state.last,
                    value: event.target.value
                  }
                })
              }
            />
            <Input
              id={this.state.email.id}
              label={this.state.email.label}
              placeholder={this.state.email.placeHolder}
              value={this.state.email.value}
              onChange={event =>
                this.setState({
                  email: {
                    ...this.state.email,
                    value: event.target.value
                  }
                })
              }
            />
            <SelectInput
              id={this.state.school.id}
              label={this.state.school.label}
              value={this.state.school.value}
              onChange={event =>
                this.setState({
                  school: {
                    ...this.state.school,
                    value: event.target.value
                  }
                })
              }
            />
            {this.state.school.value === "other" ? (
              <Input
                id={this.state.school.id}
                label={this.state.school.label}
                placeholder={this.state.school.placeHolder}
                value={this.state.school.other}
                onChange={event =>
                  this.setState({
                    school: {
                      ...this.state.school,
                      other: event.target.value
                    }
                  })
                }
              />
            ) : (
              <div />
            )}
            <Input
              id={this.state.major.id}
              label={this.state.major.label}
              placeholder={this.state.major.placeHolder}
              value={this.state.major.value}
              onChange={event =>
                this.setState({
                  major: {
                    ...this.state.major,
                    value: event.target.value
                  }
                })
              }
            />
          </div>
        );
    }
  };
  render() {
    return (
      <div className="container">
        <h1 className="text-center display-1">Registration Review</h1>
        <form onSubmit={this.onSubmit}>
          {this.renderFields()}
          <button type="submit" className="btn btn-lg btn-submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Form);

// {field.id === "email" ? (
//   <small id={`${field.id}-help`} className="form-text text-muted">
//     We'll never share your email with anyone else.
//   </small>
// ) : (
//   ""
// )}

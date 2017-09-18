import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql, compose } from 'react-apollo';
import storage from 'store';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../../utils/graphcool';

class Login extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
      state: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool,
        PropTypes.number,
        PropTypes.object,
        PropTypes.string
      ])
    }).isRequired,
    signinUserMutation: PropTypes.func.isRequired,
    createUserMutation: PropTypes.func.isRequired
  };

  state = {
    login: true,
    email: '',
    password: '',
    name: ''
  };

  componentWillMount() {
    this.setState(() => ({ login: this.props.location.state.login }));
  }

  saveUserData = (id, token) => {
    storage.set(GC_USER_ID, id);
    storage.set(GC_AUTH_TOKEN, token);
  };

  confirm = async () => {
    const { name, email, password, login } = this.state;
    if (login) {
      const result = await this.props.signinUserMutation({
        variables: {
          email,
          password
        }
      });
      const id = result.data.signinUser.user.id;
      const token = result.data.signinUser.token;
      this.saveUserData(id, token);
    } else {
      const result = await this.props.createUserMutation({
        variables: {
          name,
          email,
          password
        }
      });
      const id = result.data.signinUser.user.id;
      const token = result.data.signinUser.token;
      this.saveUserData(id, token);
    }
    await this.props.history.push('/app');
  };
  render() {
    return (
      <div>
        <h4>{this.state.login ? 'Login' : 'Sign Up'}</h4>
        <div>
          {!this.state.login && (
            <input
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Team Name"
            />
          )}
          <input
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your Email Address"
          />
          <input
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            type="text"
            placeholder="Choose a safe password"
          />
        </div>
        <div>
          <button onClick={() => this.confirm()}>
            {this.state.login ? 'login' : 'create account'}
          </button>
          <button onClick={() => this.setState({ login: !this.state.login })}>
            {this.state.login
              ? 'need to create an account'
              : 'already have an account?'}
          </button>
        </div>
      </div>
    );
  }
}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      name: $name
      authProvider: { email: { email: $email, password: $password } }
    ) {
      id
    }
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(Login);

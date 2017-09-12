import React, { Component } from 'react';
import PropTypes from 'prop-types';
import storage from 'store';
import { graphql, gql } from 'react-apollo';
import { CreateForm, HiddenFormWrapper, StyledInput } from './Forms';
import { ALL_MEMBERS } from './Members';
import { GC_USER_ID } from '../lib/constants';

class CreateMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      role: '',
      expandedHeight: '',
    };
  }

  componentDidMount() {
    const expandedHeight = this.hiddenWrapper.offsetHeight;
    this.setExpandedHeight(expandedHeight);
  }

  setExpandedHeight = (height) => {
    this.setState(() => ({ expandedHeight: height }));
  };

  emptyState = {
    name: '',
    email: '',
    role: '',
    expandedHeight: '',
  };

  clearForm = () => {
    this.setState(() => this.emptyState);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const userId = storage.get(GC_USER_ID);
    const { name, email, role } = this.state;
    this.props.createMember(name, email, role, userId);
    this.clearForm();
    this.props.toggleCreateNew();
  };

  render() {
    const { createNew } = this.props;
    return (
      <CreateForm
        open={createNew}
        expandedHeight={this.state.expandedHeight}
        onSubmit={this.handleSubmit}
      >
        <div
          ref={(hiddenWrapper) => {
            this.hiddenWrapper = hiddenWrapper;
          }}
        >
          <HiddenFormWrapper>
            <StyledInput
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
            />
            <StyledInput
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              type="text"
            />
            <StyledInput
              value={this.state.role}
              onChange={e => this.setState({ role: e.target.value })}
              type="text"
            />
            <StyledInput type="submit" value="submit" />
          </HiddenFormWrapper>
        </div>
      </CreateForm>
    );
  }
}

CreateMember.propTypes = {
  createNew: PropTypes.bool.isRequired,
  toggleCreateNew: PropTypes.func.isRequired,
  createMember: PropTypes.func.isRequired,
};

const CREATE_MEMBER = gql`
  mutation CreateMember($name: String!, $email: String!, $role: String!, $userId: ID!) {
    createMember(name: $name, email: $email, role: $role, userId: $userId) {
      id
      name
      role
      email
      user {
        id
      }
    }
  }
`;

export default graphql(CREATE_MEMBER, {
  props: ({ mutate }) => ({
    createMember: (name, email, role, userId) =>
      mutate({
        variables: { name, email, role, userId },
        optimisticResponse: {
          __typename: 'Mutation',
          createMember: {
            __typename: 'Member',
            id: -1,
            name,
            role,
            email,
            user: {
              __typename: 'User',
              id: userId,
            },
          },
        },
        update: (store, { data: { createMember } }) => {
          const data = store.readQuery({ query: ALL_MEMBERS });
          data.allMembers.push(createMember);
          store.writeQuery({ query: ALL_MEMBERS, data });
        },
      }),
  }),
})(CreateMember);

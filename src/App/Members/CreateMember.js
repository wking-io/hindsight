import React, { Component } from 'react';
import PropTypes from 'prop-types';
import storage from 'store';
import { graphql } from 'react-apollo';
import {
  CreateForm,
  HiddenFormWrapper,
  InputGroup,
  StyledLabel,
  StyledInput,
} from '../shared/Forms';
import { GC_USER_ID } from '../../utils/graphcool';
import { ALL_MEMBERS, CREATE_MEMBER } from '../../lib/queries/members';

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

  setExpandedHeight = height => {
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

  handleSubmit = e => {
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
          ref={hiddenWrapper => {
            this.hiddenWrapper = hiddenWrapper;
          }}
        >
          <HiddenFormWrapper>
            <InputGroup>
              <StyledLabel>Full Name</StyledLabel>
              <StyledInput
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                type="text"
              />
            </InputGroup>
            <InputGroup>
              <StyledLabel>Role</StyledLabel>
              <StyledInput
                value={this.state.role}
                onChange={e => this.setState({ role: e.target.value })}
                type="text"
              />
            </InputGroup>
            <InputGroup>
              <StyledLabel>Email Address</StyledLabel>
              <StyledInput
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                type="text"
              />
            </InputGroup>
            <StyledInput type="submit" value="Create Member" />
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

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
      createFormHeight: '',
    };
  }

  componentDidMount() {
    const formHeight = this.formWrapper.offsetHeight;
    this.setFormHeight(formHeight);
  }

  setFormHeight = (height) => {
    this.setState(() => ({ createFormHeight: height }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const userId = storage.get(GC_USER_ID);
    const { fields, createMember, clearForm, toggleCreateIsOpen } = this.props;
    createMember(fields.name, fields.email, fields.role, userId);
    clearForm();
    toggleCreateIsOpen();
  };

  render() {
    const { createIsOpen, fields, updateField } = this.props;
    return (
      <CreateForm
        open={createIsOpen}
        expandedHeight={this.state.createFormHeight}
        onSubmit={this.handleSubmit}
      >
        <div
          ref={(el) => {
            this.formWrapper = el;
          }}
        >
          <HiddenFormWrapper>
            <InputGroup>
              <StyledLabel>Full Name</StyledLabel>
              <StyledInput
                value={fields.name}
                onChange={e => this.setState({ name: e.target.value })}
                type="text"
              />
            </InputGroup>
            <InputGroup>
              <StyledLabel>Role</StyledLabel>
              <StyledInput value={fields.role} onChange={updateField} type="text" />
            </InputGroup>
            <InputGroup>
              <StyledLabel>Email Address</StyledLabel>
              <StyledInput
                value={fields.email}
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
  clearForm: PropTypes.func.isRequired,
  fields: PropTypes.objectOf(PropTypes.string).isRequired,
  createIsOpen: PropTypes.bool.isRequired,
  toggleCreateIsOpen: PropTypes.func.isRequired,
  createMember: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired,
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

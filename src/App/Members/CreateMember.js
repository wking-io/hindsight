import React, { Component } from 'react';
import PropTypes from 'prop-types';
import storage from 'store';
import { graphql } from 'react-apollo';
import { CreateForm, HiddenFormWrapper, StyledInput } from '../shared/Forms';
import FormField from '../shared/FormField';
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
    createMember(fields.name.value, fields.email.value, fields.role.value, userId);
    clearForm();
    toggleCreateIsOpen();
  };

  render() {
    const { createIsOpen, fields, updateField } = this.props;
    const fieldData = Object.keys(fields);
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
            {fieldData.map(key => (
              <FormField
                name={key}
                label={fields[key].label}
                value={fields[key].value}
                type={fields[key].type}
                updateField={updateField}
                key={key}
              />
            ))}
            <StyledInput type="submit" value="Create Member" />
          </HiddenFormWrapper>
        </div>
      </CreateForm>
    );
  }
}

CreateMember.propTypes = {
  clearForm: PropTypes.func.isRequired,
  fields: PropTypes.objectOf(PropTypes.object).isRequired,
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
            id: 'abc123',
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

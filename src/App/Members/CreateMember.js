import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import CreateForm from '../shared/CreateForm';
import FormField from '../shared/FormField';
import { ALL_MEMBERS, CREATE_MEMBER } from '../../lib/queries/members';

const CreateMember = ({ updateField, createMember, fields, ...props }) => (
  <CreateForm create={createMember} fields={fields} {...props}>
    {fieldData =>
      fieldData.map(key => (
        <FormField
          name={key}
          label={fields[key].label}
          value={fields[key].value}
          type={fields[key].type}
          updateField={updateField}
          key={key}
        />
      ))}
  </CreateForm>
);

CreateMember.propTypes = {
  fields: PropTypes.objectOf(PropTypes.object).isRequired,
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

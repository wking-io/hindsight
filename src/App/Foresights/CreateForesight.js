import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import CreateForm from '../shared/CreateForm';
import FormField from '../shared/FormField';
import { ALL_FORESIGHTS, CREATE_FORESIGHT } from '../../lib/queries/foresights';

const CreateForesight = ({ updateField, createForesight, fields, count, ...props }) => (
  <CreateForm create={createForesight} fields={fields} staticFields={[count]} {...props}>
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

CreateForesight.propTypes = {
  fields: PropTypes.objectOf(PropTypes.object).isRequired,
  createForesight: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default graphql(CREATE_FORESIGHT, {
  props: ({ mutate }) => ({
    createForesight: (action, order, userId) =>
      mutate({
        variables: { action, order, userId },
        optimisticResponse: {
          __typename: 'Mutation',
          createForesight: {
            id: 'abc123',
            __typename: 'Foresight',
            action,
            order,
            status: 'ACTIVE',
            user: {
              __typename: 'User',
              id: userId,
            },
          },
        },
        update: (store, { data: { createForesight } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: ALL_FORESIGHTS });
          // Add our comment from the mutation to the end.
          data.allForesights.push(createForesight);
          // Write our data back to the cache.
          store.writeQuery({ query: ALL_FORESIGHTS, data });
        },
      }),
  }),
})(CreateForesight);

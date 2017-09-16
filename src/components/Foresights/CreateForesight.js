import React, { Component } from 'react';
import PropTypes from 'prop-types';
import storage from 'store';
import { graphql, gql } from 'react-apollo';
import { CreateForm, HiddenFormWrapper, InputGroup, StyledLabel, StyledInput } from '../Forms';
import { GC_USER_ID } from '../../lib/constants';
import { ALL_FORESIGHTS } from '../Foresights';

class CreateForesight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
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
    action: '',
    expandedHeight: '',
  };

  clearForm = () => {
    this.setState(() => this.emptyState);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { createForesight, count, toggleCreateNew } = this.props;
    const { action } = this.state;
    const userId = storage.get(GC_USER_ID);
    createForesight(action, userId, count);
    this.clearForm();
    toggleCreateNew();
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
            <InputGroup>
              <StyledLabel>Action</StyledLabel>
              <StyledInput
                value={this.state.action}
                onChange={e => this.setState({ action: e.target.value })}
                type="text"
              />
            </InputGroup>
            <StyledInput type="submit" value="Create Foresight" />
          </HiddenFormWrapper>
        </div>
      </CreateForm>
    );
  }
}

CreateForesight.propTypes = {
  createNew: PropTypes.bool.isRequired,
  toggleCreateNew: PropTypes.func.isRequired,
  createForesight: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

const CREATE_FORESIGHT = gql`
  mutation CreateForesight($action: String!, $userId: ID!, $order: Int!) {
    createForesight(action: $action, userId: $userId, order: $order) {
      id
      action
      status
      order
      user {
        id
      }
    }
  }
`;

export default graphql(CREATE_FORESIGHT, {
  props: ({ mutate }) => ({
    createForesight: (action, userId, order) =>
      mutate({
        variables: { action, userId, order },
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

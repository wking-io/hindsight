import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';
import ErrorMessage from '../shared/ErrorMessage';
import AddSomething from '../shared/AddSomething';
import CreateMember from './CreateMember';
import MembersContainer from './MembersContainer';
import { ALL_MEMBERS } from '../../lib/queries/members';

class Members extends Component {
  constructor(props) {
    super(props);
    this.state = this.emptyState;
  }

  emptyState = {
    createIsOpen: false,
    fields: {
      name: {
        label: 'Full Name',
        value: '',
        type: 'text',
      },
      role: {
        label: 'Role',
        value: '',
        type: 'text',
      },
      email: {
        label: 'Email Address',
        value: '',
        type: 'email',
      },
    },
  };

  clearForm = () => {
    this.setState(() => this.emptyState);
  };

  toggleCreateIsOpen = () => {
    this.setState(prevState => ({ createIsOpen: !prevState.createIsOpen }));
  };

  updateField = (e) => {
    const { name, value } = e.target;
    const newState = update(this.state, {
      fields: { [name]: { $merge: { value } } },
    });
    this.setState(() => newState);
  };

  render() {
    const { error, loading, allMembers } = this.props.data;
    const { createIsOpen, fields } = this.state;
    if (loading) return <div>loading...</div>;
    if (error) return <ErrorMessage message="Error loading members." />;
    return (
      <section>
        <AddSomething createIsOpen={createIsOpen} toggleCreateIsOpen={this.toggleCreateIsOpen} />
        <CreateMember
          createIsOpen={createIsOpen}
          toggleCreateIsOpen={this.toggleCreateIsOpen}
          clearForm={this.clearForm}
          fields={fields}
          staticFields={{ order: allMembers.length - 1 }}
          updateField={this.updateField}
        />
        <MembersContainer members={allMembers} />
      </section>
    );
  }
}

Members.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    allMembers: PropTypes.array,
  }).isRequired,
};

export default graphql(ALL_MEMBERS)(Members);

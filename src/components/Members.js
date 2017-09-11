import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../lib/constants';
import ErrorMessage from './ErrorMessage';
import AddSomething from './AddSomething';
import CreateMember from './CreateMember';

class Members extends Component {
  state = {
    createNew: false,
  };

  toggleCreateNew = () => this.setState(prevState => ({ createNew: !prevState.createNew }));

  render() {
    const { error, loading, allMembers } = this.props.data;
    if (loading) return <div>loading...</div>;
    if (error) return <ErrorMessage message="Error loading members." />;
    return (
      <section>
        <AddSomething createNew={this.state.createNew} toggleCreateNew={this.toggleCreateNew} />
        <CreateMember createNew={this.state.createNew} toggleCreateNew={this.toggleCreateNew} />
        <ul>{allMembers.map(member => <li key={member.id}>{member.name}</li>)}</ul>
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

export const ALL_MEMBERS = gql`
  query AllMembers {
    allMembers {
      id
      name
      role
      email
    }
  }
`;

export default graphql(ALL_MEMBERS)(Members);

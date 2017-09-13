import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';
import ErrorMessage from './ErrorMessage';
import AddSomething from './AddSomething';
import CreateMember from './CreateMember';
import Card, { CardGroup } from './Card';
import MemberData from './MemberData';

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
        <CardGroup>
          {allMembers.map(member => (
            <Card key={member.id}>
              <MemberData member={member} />
            </Card>
          ))}
        </CardGroup>
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

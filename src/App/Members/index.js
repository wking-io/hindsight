import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import ErrorMessage from '../shared/ErrorMessage';
import AddSomething from '../shared/AddSomething';
import CreateMember from './CreateMember';
import Card, { CardGroup } from '../shared/Card';
import MemberData from './MemberData';
import { ALL_MEMBERS } from '../../lib/queries/members';

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
          {allMembers.map((member, i) => (
            <Card key={member.id} index={i}>
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

export default graphql(ALL_MEMBERS)(Members);

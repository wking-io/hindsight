import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';
import ErrorMessage from './ErrorMessage';
import AddSomething from './AddSomething';
import CreateForesight from './Foresights/CreateForesight';
import Container from './Foresights/Container';

class Foresights extends Component {
  state = {
    createNew: false,
  };

  toggleCreateNew = () => this.setState(prevState => ({ createNew: !prevState.createNew }));

  render() {
    const { error, loading, allForesights } = this.props.foresights;
    if (loading) return <div>loading...</div>;
    if (error) return <ErrorMessage message="Error loading forsights." />;
    return (
      <section>
        <AddSomething createNew={this.state.createNew} toggleCreateNew={this.toggleCreateNew} />
        <CreateForesight
          createNew={this.state.createNew}
          toggleCreateNew={this.toggleCreateNew}
          count={allForesights.length - 1}
        />
        <Container foresights={allForesights} />
      </section>
    );
  }
}

Foresights.propTypes = {
  foresights: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    allForesights: PropTypes.array,
  }).isRequired,
};

export const ALL_FORESIGHTS = gql`
  query AllForesights {
    allForesights(orderBy: order_ASC) {
      id
      action
      status
    }
  }
`;

export default graphql(ALL_FORESIGHTS, { name: 'foresights' })(Foresights);

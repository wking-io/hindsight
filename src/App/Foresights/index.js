import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import ErrorMessage from '../shared/ErrorMessage';
import AddSomething from '../shared/AddSomething';
import CreateForesight from './CreateForesight';
import DraggableContainer from './DraggableContainer';
import { ALL_FORESIGHTS } from '../../lib/queries/foresights';

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
        <DraggableContainer foresights={allForesights} />
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

export default graphql(ALL_FORESIGHTS, { name: 'foresights' })(Foresights);

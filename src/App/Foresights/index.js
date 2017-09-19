import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { graphql } from 'react-apollo';
import ErrorMessage from '../shared/ErrorMessage';
import AddSomething from '../shared/AddSomething';
import CreateForesight from './CreateForesight';
import DraggableContainer from './DraggableContainer';
import { ALL_FORESIGHTS } from '../../lib/queries/foresights';

class Foresights extends Component {
  constructor(props) {
    super(props);
    this.state = this.emptyState;
  }

  emptyState = {
    createIsOpen: false,
    fields: {
      action: {
        label: 'Action',
        value: '',
        type: 'text',
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
    const { error, loading, allForesights } = this.props.foresights;
    const { createIsOpen, fields } = this.state;
    if (loading) return <div>loading...</div>;
    if (error) return <ErrorMessage message="Error loading forsights." />;
    return (
      <section>
        <AddSomething createIsOpen={createIsOpen} toggleCreateIsOpen={this.toggleCreateIsOpen} />
        <CreateForesight
          createIsOpen={createIsOpen}
          toggleCreateIsOpen={this.toggleCreateIsOpen}
          clearForm={this.clearForm}
          fields={fields}
          updateField={this.updateField}
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

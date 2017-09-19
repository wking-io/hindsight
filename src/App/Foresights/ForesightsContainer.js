import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import ForesightCard from './ForesightCard';
import DraggableContainer from '../shared/DraggableContainer';
import { Wrapper } from '../shared/Layout';
import { UPDATE_FORESIGHT_ORDER } from '../../lib/queries/foresights';

const ForesightsContainer = ({ foresights, updateForesight }) => (
  <DraggableContainer data={foresights} updater={updateForesight}>
    {(cards, moveCard, updateOrder) => (
      <Wrapper addSpace>
        {cards.map((card, i) => (
          <ForesightCard
            key={card.id}
            index={i}
            id={card.id}
            action={card.action}
            moveCard={moveCard}
            updateOrder={updateOrder}
          />
        ))}
      </Wrapper>
    )}
  </DraggableContainer>
);

ForesightsContainer.propTypes = {
  foresights: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateForesight: PropTypes.func.isRequired,
};

export default graphql(UPDATE_FORESIGHT_ORDER, {
  props: ({ mutate }) => ({
    updateForesight: (order, id) =>
      mutate({
        variables: { order, id },
      }),
  }),
})(ForesightsContainer);

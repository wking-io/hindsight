import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import MemberCard from './MemberCard';
import DraggableContainer from '../shared/DraggableContainer';
import { Wrapper } from '../shared/Layout';
import { UPDATE_MEMBER_ORDER } from '../../lib/queries/members';

const MembersContainer = ({ members, updateMemberOrder }) => (
  <DraggableContainer data={members} updater={updateMemberOrder}>
    {(cards, moveCard, updateOrder) => (
      <Wrapper addSpace>
        {cards.map((card, i) => (
          <MemberCard
            key={card.id}
            index={i}
            id={card.id}
            member={card}
            moveCard={moveCard}
            updateOrder={updateOrder}
          />
        ))}
      </Wrapper>
    )}
  </DraggableContainer>
);

MembersContainer.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateMemberOrder: PropTypes.func.isRequired,
};

export default graphql(UPDATE_MEMBER_ORDER, {
  props: ({ mutate }) => ({
    updateMemberOrder: (order, id) =>
      mutate({
        variables: { order, id },
      }),
  }),
})(MembersContainer);

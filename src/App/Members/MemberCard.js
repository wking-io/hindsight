import React from 'react';
import PropTypes from 'prop-types';
import DraggableCard from '../shared/DraggableCard';
import Card from '../shared/Card';
import MemberData from './MemberData';

const MemberCard = ({ member, ...props }) => (
  <DraggableCard {...props}>
    {isDragging => (
      <Card style={{ opacity: isDragging ? 0 : 1 }}>
        <MemberData member={member} />
      </Card>
    )}
  </DraggableCard>
);

MemberCard.propTypes = {
  member: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default MemberCard;

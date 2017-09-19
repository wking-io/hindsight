import React from 'react';
import PropTypes from 'prop-types';
import DraggableCard from '../shared/DraggableCard';
import Card from '../shared/Card';

const ForesightCard = ({ action, ...props }) => (
  <DraggableCard {...props}>
    {isDragging => <Card style={{ opacity: isDragging ? 0 : 1 }}>{action}</Card>}
  </DraggableCard>
);

ForesightCard.propTypes = {
  action: PropTypes.string.isRequired,
};

export default ForesightCard;

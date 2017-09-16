import React, { Component } from 'react';
import update from 'immutability-helper';
import { graphql, gql, compose } from 'react-apollo';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';

const style = {
  width: '100%',
};

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.foresights,
    };
  }

  componentWillReceiveProps(nextProps) {
    const lastItem = a => a[a.length - 1];
    const lastPrev = lastItem(this.props.foresights);
    const lastNext = lastItem(nextProps.foresights);

    if (lastPrev.id !== lastNext.id) {
      this.setState(() => ({ cards: nextProps.foresights }));
    }
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    );
  };

  updateOrder = () => {
    const { cards } = this.state;
    const { updateForesight } = this.props;
    cards.map((card, i) => updateForesight(i, card.id));
  };

  render() {
    const { cards } = this.state;

    return (
      <div style={style}>
        {cards.map((card, i) => (
          <Card
            key={card.id}
            index={i}
            id={card.id}
            text={card.action}
            moveCard={this.moveCard}
            updateOrder={this.updateOrder}
          />
        ))}
      </div>
    );
  }
}

const UPDATE_FORESIGHT_ORDER = gql`
  mutation UpdateForesightOrder($order: Int!, $id: ID!) {
    updateForesight(order: $order, id: $id) {
      id
      order
    }
  }
`;

export default compose(
  graphql(UPDATE_FORESIGHT_ORDER, {
    props: ({ mutate }) => ({
      updateForesight: (order, id) =>
        mutate({
          variables: { order, id },
        }),
    }),
  }),
  DragDropContext(HTML5Backend),
)(Container);

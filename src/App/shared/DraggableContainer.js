import { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class DraggableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.data,
    };
  }

  componentWillReceiveProps(nextProps) {
    const lastItem = a => a[a.length - 1];
    const lastPrev = lastItem(this.props.data);
    const lastNext = lastItem(nextProps.data);

    if (lastPrev.id !== lastNext.id) {
      this.setState(() => ({ cards: nextProps.data }));
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
    const { updater } = this.props;
    cards.map((card, i) => updater(i, card.id));
  };

  render() {
    const { cards } = this.state;
    return this.props.children(cards, this.moveCard, this.updateOrder);
  }
}

DraggableContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.func.isRequired,
  updater: PropTypes.func.isRequired,
};

export default DragDropContext(HTML5Backend)(DraggableContainer);

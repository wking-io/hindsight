import { Component } from 'react';
import PropTypes from 'prop-types';

class EditableCard extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState;
  }

  initState = { ...this.props.data, updateIsOpen: false };

  update = {
    cancel: () => {
      this.setState(() => this.initState);
    },
    delete: () => {
      const { data, deleteThis } = this.props;
      deleteThis(data.id);
    },
    submit: () => {
      const { updateIsOpen, ...data } = this.state;
      this.props.updateThis(data);
      this.initState = { ...data, updateIsOpen: false };
      this.update.toggle();
    },
    toggle: () => {
      this.setState(prevState => ({ updateIsOpen: !prevState.updateIsOpen }));
    },
    track: (e) => {
      const { name, value } = e.target;
      this.setState(() => ({ [name]: value }));
    },
  };

  render() {
    const { updateIsOpen, ...memberData } = this.state;
    return this.props.children(memberData, updateIsOpen, this.update);
  }
}

EditableCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  deleteThis: PropTypes.func.isRequired,
  updateThis: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

export default EditableCard;

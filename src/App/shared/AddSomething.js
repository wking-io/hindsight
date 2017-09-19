import React from 'react';
import PropTypes from 'prop-types';
import { AddButton } from './Buttons';
import { FlexWrapper } from './Layout';

const AddSomething = ({ createIsOpen, toggleCreateIsOpen }) => (
  <FlexWrapper justify="flex-end">
    <AddButton
      close={createIsOpen}
      onClick={() => toggleCreateIsOpen()}
      className={createIsOpen && 'close'}
    >
      <span />
      <span />
    </AddButton>
  </FlexWrapper>
);

AddSomething.propTypes = {
  createIsOpen: PropTypes.bool.isRequired,
  toggleCreateIsOpen: PropTypes.func.isRequired,
};

export default AddSomething;

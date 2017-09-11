import React from 'react';
import PropTypes from 'prop-types';
import { AddButton } from './Buttons';
import { FlexWrapper } from './Layout';

const AddSomething = ({ createNew, toggleCreateNew }) => (
  <FlexWrapper justify="flex-end">
    <AddButton close={createNew} onClick={() => toggleCreateNew()} className={createNew && 'close'}>
      <span />
      <span />
    </AddButton>
  </FlexWrapper>
);

AddSomething.propTypes = {
  createNew: PropTypes.bool.isRequired,
  toggleCreateNew: PropTypes.func.isRequired,
};

export default AddSomething;

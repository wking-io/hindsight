import React from 'react';
import PropTypes from 'prop-types';
import { EditableInput } from '../shared/Forms';
import { BodyText } from '../shared/Typography';

const MemberValue = ({ type, name, value, updateIsOpen, updateValue }) =>
  (updateIsOpen ? (
    <EditableInput
      type={type}
      value={value}
      name={name}
      updateIsOpen={updateIsOpen}
      onChange={updateValue}
    />
  ) : (
    <BodyText>{value}</BodyText>
  ));

MemberValue.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updateIsOpen: PropTypes.bool.isRequired,
  updateValue: PropTypes.func.isRequired,
};

export default MemberValue;

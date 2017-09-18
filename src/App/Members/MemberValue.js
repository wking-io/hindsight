import React from 'react';
import PropTypes from 'prop-types';
import { EditableInput } from '../shared/Forms';
import { BodyText } from '../shared/Typography';

const MemberValue = ({ type, name, value, readOnly, updateValue }) =>
  readOnly ? (
    <BodyText>{value}</BodyText>
  ) : (
    <EditableInput
      type={type}
      value={value}
      name={name}
      readOnly={readOnly}
      onChange={updateValue}
    />
  );

MemberValue.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  updateValue: PropTypes.func.isRequired,
};

export default MemberValue;

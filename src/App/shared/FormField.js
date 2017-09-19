import React from 'react';
import { InputGroup, StyledLabel, StyledInput } from './Forms';

const FormField = ({ parent, name, label, value, type, updateField }) => (
  <InputGroup>
    <StyledLabel>{label}</StyledLabel>
    <StyledInput name={name} value={value} onChange={updateField} type={type} />
  </InputGroup>
);

export default FormField;

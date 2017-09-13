import React, { Component } from 'react';
import { EditableInput } from './Forms';
import { BodyText } from './Typography';

const MemberValue = ({ type, value, readOnly }) =>
  (readOnly ? (
    <BodyText>{value}</BodyText>
  ) : (
    <EditableInput type={type} value={value} readOnly={readOnly} />
  ));

export default MemberValue;

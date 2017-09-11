import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Error = styled.aside`
  padding: 1.5em;
  font-size: 14px;
  color: white;
  background-color: red;
`;

const ErrorMessage = ({ message }) => <Error>{message}</Error>;

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;

import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, LinkButton, LinkOutlineButton } from './Buttons';

const WelcomeLinks = ({ isUser }) =>
  (isUser ? (
    <LinkButton to="/app">Dashboard</LinkButton>
  ) : (
    <ButtonGroup>
      <LinkButton to={{ pathname: '/auth/login', state: { login: true } }}>Login</LinkButton>
      <LinkOutlineButton to={{ pathname: '/auth/login', state: { login: false } }}>
        Signup
      </LinkOutlineButton>
    </ButtonGroup>
  ));

WelcomeLinks.propTypes = {
  isUser: PropTypes.string.isRequired,
};

export default WelcomeLinks;

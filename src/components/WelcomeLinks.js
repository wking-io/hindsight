import React from 'react';
import { ButtonGroup, LinkButton, LinkOutlineButton } from './Buttons';

const WelcomeLinks = () => (
  <ButtonGroup>
    <LinkButton to={{ pathname: '/auth/login', state: { login: true } }}>Login</LinkButton>
    <LinkOutlineButton to={{ pathname: '/auth/login', state: { login: false } }}>
      Signup
    </LinkOutlineButton>
  </ButtonGroup>
);

export default WelcomeLinks;

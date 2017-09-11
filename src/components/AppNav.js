import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Logo from './Logo';
import { OutlineButton, StyledNavLink } from './Buttons';
import { Header, ContentWrapper, NavWrapper, NavItems } from './Layout';
import logout from '../utils/logout';

const AppNav = ({ history }) => (
  <Header>
    <ContentWrapper>
      <NavWrapper align="center" justify="space-between">
        <Logo theHeight="2.5em" />
        <NavItems align="center" justify="flex-end">
          <StyledNavLink exact to="/app" activeClassName="active">
            Home
          </StyledNavLink>
          <StyledNavLink to="/app/retros" activeClassName="active">
            Retros
          </StyledNavLink>
          <StyledNavLink to="/app/members" activeClassName="active">
            Members
          </StyledNavLink>
          <StyledNavLink to="/app/foresights" activeClassName="active">
            Foresights
          </StyledNavLink>
          <OutlineButton outline onClick={() => logout(history)}>
            Logout
          </OutlineButton>
        </NavItems>
      </NavWrapper>
    </ContentWrapper>
  </Header>
);

AppNav.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default withRouter(AppNav);

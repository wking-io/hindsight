import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { SANS_FONT, PRIMARY_DARK, BLUE_DARK, BLUE_GRADIENT, WHITE } from '../lib/constants';

export const Button = styled.button`
  color: ${WHITE};
  display: inline-block;
  font-family: ${SANS_FONT};
  font-size: 1em;
  padding: 0.25em 1em;
  background-color: ${BLUE_DARK};
  border: 2px solid ${BLUE_DARK};
  cursor: pointer;

  &:hover {
    background-image: ${BLUE_GRADIENT('to right')};
  }
`;

export const OutlineButton = Button.extend`
  color: ${PRIMARY_DARK};
  background-color: transparent;

  &:hover {
    background-color: ${BLUE_DARK};
    background-image: none;
  }

  &:focus {
    outline: none;
  }
`;

export const LinkButton = Button.withComponent(Link).extend`
  text-decoration: none;
`;

export const LinkOutlineButton = OutlineButton.withComponent(Link).extend`
  text-decoration: none;
`;

export const ButtonGroup = styled.div`
  > ${Button}, > ${LinkButton} {
    margin-left: 1em;
  }
  > ${Button}:first-child, > ${LinkButton}:first-child {
    margin-left: 0;
  }
`;

export const Anchor = styled.a`
  color: ${PRIMARY_DARK};
  font-size: 1em;
  font-family: ${SANS_FONT};
  font-weight: 500;
  padding: 0 0.25em;
  text-decoration: none;

  &.active {
    background-image: ${BLUE_GRADIENT('to right')};
    background-size: 100% 50%;
    background-position: 0% 100%;
    background-repeat: no-repeat;
  }
`;

export const StyledNavLink = Anchor.withComponent(NavLink).extend``;

import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { SANS_FONT, PRIMARY_DARK, BLUE_DARK, BLUE_GRADIENT, WHITE } from '../lib/constants';

export const Button = styled.button`
  color: ${PRIMARY_DARK};
  display: inline-block;
  font-family: ${SANS_FONT};
  font-size: 1em;
  padding: 0.25em 1em;
  background-image: ${BLUE_GRADIENT('to right')}, ${BLUE_GRADIENT('to right')};
  background-size: calc(100% - 4px) calc(100% - 4px), 100%;
  background-repeat: no-repeat;
  background-position: center, center;
  border: none;
  cursor: pointer;

  &:hover {
    background-image: linear-gradient(white, white), ${BLUE_GRADIENT('to right')};
  }
`;

export const OutlineButton = Button.extend`
  color: ${PRIMARY_DARK};
  background-image: linear-gradient(white, white), ${BLUE_GRADIENT('to right')};

  &:hover {
    background-image: ${BLUE_GRADIENT('to right')}, ${BLUE_GRADIENT('to right')};
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
  > ${Button}, > ${LinkButton}, > ${OutlineButton}, ${LinkOutlineButton} {
    margin-left: 1em;
  }
  > ${Button}:first-child,
    > ${LinkButton}:first-child,
    > ${OutlineButton}:first-child,
    > ${LinkOutlineButton}:first-child {
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

export const AddButton = styled.button`
  border: none;
  outline: none;
  background: none;
  height: 16px;
  width: 16px;
  padding: 0;
  position: relative;
  cursor: pointer;
  margin: 1.5em 0 0;

  :active {
    outline: none;
  }

  > span {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 3px;
    background-color: ${PRIMARY_DARK};
    transform: translate(-50%, -50%);
    transition: all 0.25s cubic-bezier(0.39, 0.01, 0.55, 0.97);

    &:first-child {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }

  &.close > span {
    transform: translate(-50%, -50%) rotate(135deg);
  }

  &.close > span:first-child {
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;

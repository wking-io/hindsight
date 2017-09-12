import styled from 'styled-components';
import { SANS_FONT, PRIMARY_DARK, PRIMARY_MEDIUM, WHITE } from '../lib/constants';

export const StyledInput = styled.input`
  font-family: ${SANS_FONT};
  font-size: 0.875em;
  border: 1px solid white;
  border-color: ${props => (props.type === 'submit' ? PRIMARY_DARK : 'white')};
  background-color: ${props => (props.type === 'submit' ? 'transparent' : 'white')};
  color: ${PRIMARY_DARK};
  padding: 0.3em 0.5em 0.25em;

  :active,
  :focus {
    outline: none;
    border-color: ${PRIMARY_DARK};
  }

  :hover {
    background-color: ${props => (props.type === 'submit' ? PRIMARY_DARK : '')};
    color: ${props => (props.type === 'submit' ? WHITE : '')};
  }
`;

export const CreateForm = styled.form`
  height: ${props => (props.open ? `${props.expandedHeight}px` : '0')};
  overflow: hidden;
  transition: height 0.25s cubic-bezier(0.39, 0.01, 0.55, 0.97);
`;

export const HiddenFormWrapper = styled.div`
  padding: 1em 0;
  display: flex;
  align-items: flex-end;
`;

export const InputGroup = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-right: 1.5em;
`;

export const StyledLabel = styled.label`
  font-size: 0.875em;
  color: ${PRIMARY_DARK};
  margin-bottom: 0.5em;
`;

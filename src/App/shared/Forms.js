import styled from 'styled-components';
import { PRIMARY_DARK, PRIMARY_MEDIUM, WHITE } from '../../utils/colors';
import SANS_FONT from '../../utils/fonts';

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

export const StyledForm = styled.form`
  padding: 1em 0;
  display: flex;
  align-items: flex-end;
  opacity: ${props => (props.open ? 1 : 0)};
  transition: opacity 0.25s cubic-bezier(0.39, 0.01, 0.55, 0.97) 0.15s;
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

export const EditableInput = styled.input`
  font-family: ${SANS_FONT};
  font-size: 0.875em;
  border: 1px solid white;
  border-color: ${PRIMARY_MEDIUM};
  background-color: white;
  color: ${PRIMARY_DARK};
  padding: 0.3em 0.5em 0.25em;
  flex: 1;
`;

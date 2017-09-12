import styled from 'styled-components';
import { SANS_FONT, PRIMARY_DARK, PRIMARY_MEDIUM } from '../lib/constants';

export const StyledInput = styled.input`
  font-family: ${SANS_FONT};
  border: 1px solid ${PRIMARY_MEDIUM};

  :active,
  :focus {
    outline: none;
    border-color: ${PRIMARY_DARK};
  }
`;

export const CreateForm = styled.form`
  height: ${props => (props.open ? 'auto' : '0')};
  padding: ${props => (props.open ? '1em 0' : '0')};
  overflow: hidden;
`;

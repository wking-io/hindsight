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
  height: ${props => (props.open ? `${props.expandedHeight}px` : '0')};
  overflow: hidden;
  transition: height 0.25s cubic-bezier(0.39, 0.01, 0.55, 0.97);
`;

export const HiddenFormWrapper = styled.div`padding: 1em 0;`;

import styled from 'styled-components';
import { SANS_FONT, PRIMARY_DARK } from '../lib/constants';

export const Subheading = styled.h2`
  font-family: ${SANS_FONT};
  font-size: 1.5em;
  color: ${PRIMARY_DARK};
  margin: 0 0 1em 0;
`;

export const BodyText = styled.p`
  font-family: ${SANS_FONT};
  font-size: 1em;
  line-height: 1.4;
  color: ${PRIMARY_DARK};
  margin: 0 0 1.5em 0;
`;

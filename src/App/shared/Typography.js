import styled from 'styled-components';
import { PRIMARY_DARK } from '../../utils/colors';
import SANS_FONT from '../../utils/fonts';

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
  margin: ${props => (props.addSpace ? '0 0 1.5em 0' : '0 0 0 0')};
  text-align: ${props => (props.alignRight ? 'right' : 'left')};
`;

export const Divider = BodyText.extend`
  margin: 0 0.625em;
  width: ${props => (props.visible ? '' : '0.5em')};
  visibility: ${props => (props.visible ? '' : 'hidden')};
`;

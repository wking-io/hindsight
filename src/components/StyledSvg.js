import styled from 'styled-components';

const StyledSvg = styled.svg`
  width: ${props => props.theWidth || 'auto'};
  height: ${props => props.theHeight || 'auto'};
`;
export default StyledSvg;

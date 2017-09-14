import styled from 'styled-components';

export const Header = styled.header`background: white;`;
export const CenterInScreen = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ContentWrapper = styled.section`
  width: 85vw;
  margin: ${props => (props.addSpace ? '1em auto' : '0 auto')};
`;

export const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: ${props => props.align};
  justify-content: ${props => props.justify};

  > *:nth-child(${props => props.spread}) {
    flex: 1;
  }
`;

export const FlexItem = styled.div`
  flex: 1;
  align-self: ${props => props.self};
`;

export const NavItems = FlexWrapper.extend`
  > * {
    margin-left: 1em;
  }
`;

export const NavWrapper = FlexWrapper.extend`padding: 1em 0;`;

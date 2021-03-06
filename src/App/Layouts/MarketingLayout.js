import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../shared/Logo';
import WelcomeLinks from '../shared/WelcomeLinks';
import {
  CenterInScreen,
  ContentWrapper,
  FlexWrapper,
  FlexItem
} from '../shared/Layout';
import { Subheading, BodyText } from '../shared/Typography';

const MarketingLayout = ({ isUser }) => (
  <CenterInScreen>
    <ContentWrapper>
      <FlexWrapper>
        <FlexItem>
          <Logo theHeight="4.25em" theWidth="100%" />
        </FlexItem>
        <FlexItem>
          <Subheading>
            A tool to facilitate your team having open discussions around
            improving your process.
          </Subheading>
          <BodyText addSpace>
            Track how your team draws operates and how you identify insights to
            improve your workflow moving forward. Log in below or sign up if you
            haven’t created an account yet and learn how to build a
            communication process within your team that will open the door to
            real communication.
          </BodyText>
          <WelcomeLinks isUser={isUser} />
        </FlexItem>
      </FlexWrapper>
    </ContentWrapper>
  </CenterInScreen>
);

MarketingLayout.propTypes = {
  isUser: PropTypes.string.isRequired
};

export default MarketingLayout;

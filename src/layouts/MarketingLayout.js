import React from 'react';
import Logo from '../components/Logo';
import WelcomeLinks from '../components/WelcomeLinks';
import { CenterInScreen, ContentWrapper, FlexWrapper, FlexItem } from '../components/Layout';
import { Subheading, BodyText } from '../components/Typography';

const MarketingLayout = () => (
  <CenterInScreen>
    <ContentWrapper>
      <FlexWrapper>
        <FlexItem>
          <Logo theHeight="4.25em" theWidth="100%" />
        </FlexItem>
        <FlexItem>
          <Subheading>
            A tool to facilitate your team having open discussions around improving your process.
          </Subheading>
          <BodyText>
            Track how your team draws operates and how you identify insights to improve your
            workflow moving forward. Log in below or sign up if you haven’t created an account yet
            and learn how to build a communication process within your team that will open the door
            to real communication.
          </BodyText>
          <WelcomeLinks />
        </FlexItem>
      </FlexWrapper>
    </ContentWrapper>
  </CenterInScreen>
);

export default MarketingLayout;

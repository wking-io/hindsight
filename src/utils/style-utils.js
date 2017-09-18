import { css } from 'styled-components';
import breakpoints from './breakpoints';

// iterate through the sizes and create a media template
const media = Object.keys(breakpoints).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = breakpoints[label] / 16;
  const obj = {};
  obj[label] = (...args) =>
    css`
      @media (max-width: ${emSize}em) {
        ${css(...args)};
      }
    `;
  return { ...accumulator, ...obj };
}, {});

export default media;

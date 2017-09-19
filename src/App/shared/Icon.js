import React from 'react';
import PropTypes from 'prop-types';
import { IconSvg, MainPath } from './Buttons';

const Icon = ({ icon, type, action }) => (
  <IconSvg
    type={type}
    height="22"
    width="18"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    onClick={action}
  >
    <MainPath d={icon} />
    <path d="M0 0h24v24H0z" fill="none" />
  </IconSvg>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  type: PropTypes.string,
  action: PropTypes.func,
};

Icon.defaultProps = {
  type: '',
  action: '',
};

export default Icon;

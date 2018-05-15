import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ text, children }) => (
  <div>{children}</div>
);

Tooltip.propTypes = {
  text: t.string,
};

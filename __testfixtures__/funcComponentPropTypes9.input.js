import React from 'react';
import PropTypes from 'prop-types';
import {useSheet} from 'jss';

const Tooltip = ({ text, icon }) => (
  <div />
);

Tooltip.propTypes = {
  text: t.string,
  icon: t.string,
};

export default useSheet(sheet)(Tooltip);

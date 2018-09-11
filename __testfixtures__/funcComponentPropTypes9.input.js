import React from 'react';
import PropTypes from 'prop-types';
import {useSheet, createSheet} from 'jss';

const sheet = createSheet({});

const Tooltip = ({ text, icon }) => (
  <div />
);

Tooltip.propTypes = {
  text: t.string,
  icon: t.string,
};

export default useSheet(sheet)(Tooltip);

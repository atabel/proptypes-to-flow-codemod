import React from 'react';
import PropTypes from 'prop-types';
import {useSheet, createSheet} from 'jss';

const sheet = createSheet({});

class Tooltip extends React.Component {
  static propTypes = {
    a: PropTypes.node,
    b: PropTypes.node,
  };

  render() {
    return <div />
  }
}

export default useSheet(sheet)(Tooltip);

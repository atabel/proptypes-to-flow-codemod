import React from 'react';
import PropTypes from 'prop-types';
import {useSheet} from 'jss';

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

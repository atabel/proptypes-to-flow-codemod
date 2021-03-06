import React from 'react';
import PropTypes from 'prop-types';

class Tooltip extends React.Component {
  static propTypes = {
    a: PropTypes.node,
    b: PropTypes.node,
  };

  render() {
    return <div />
  }
}

const C = ({a}) => a;
C.propTypes = {a: PropTypes.node.isRequired};

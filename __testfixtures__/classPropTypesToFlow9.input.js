import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tooltip extends Component {
  static propTypes = {
    headline: PropTypes.string.isRequired,
    children: PropTypes.node,
    text: PropTypes.string,
    shouldBeShown: PropTypes.bool,
    icon: PropTypes.oneOf(['default', 'custom']),
    time: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }).isRequired,
    fonts: PropTypes.arrayOf(PropTypes.string),
    onShow: PropTypes.func,
    position: PropTypes.object,
    colors: PropTypes.array,
  };

  static defaultProps = {
    headline: 'Test'
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <div />
  }
}

class OtherComponent extends Component {
  static propTypes = {
    a: PropTypes.string,
    b: PropTypes.number,
  };

  render() {
    return <div />
  }
}

const FunctionalComp = (props) => <div />;
FunctionalComp.propTypes = {
  c: PropTypes.string.isRequired,
  d: PropTypes.number,
};

function FunctionalComp2(props) {
  return <div />;
}
FunctionalComp2.propTypes = {
  e: PropTypes.string,
  f: PropTypes.number.isRequired,
};

class ClassComponent3 extends Component {
  static propTypes = {
    g: PropTypes.string,
    h: PropTypes.number,
  };

  render() {
    return <div />
  }
}

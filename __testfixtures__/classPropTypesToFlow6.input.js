// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

type TooltipProps = {
  headline: string,
  children?: React.Node,
  text?: string,
  shouldBeShown?: boolean,
  icon?: 'default' | 'custom',
  time?: number | string,
  size: {
    width: number,
    height: number,
  },
  fonts?: Array<string>,
  onShow?: Function,
  position?: {},
  colors?: Array<any>,
};

const propTypes = {
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

class Tooltip extends React.Component<TooltipProps> {
  static propTypes = propTypes;

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

// @flow
import * as React from 'react';

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

class Tooltip extends React.Component<TooltipProps> {
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

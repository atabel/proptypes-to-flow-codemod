// @flow
import * as React from 'react';

type TooltipProps = {
  a?: React.Node,
  b?: React.Node,
};

class Tooltip extends React.Component<TooltipProps> {
  render() {
    return <div />
  }
}

type CProps = { a: React.Node };

const C = ({a}: CProps) => a;

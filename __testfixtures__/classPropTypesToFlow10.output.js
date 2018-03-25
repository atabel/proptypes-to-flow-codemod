// @flow
import React, { Component } from 'react';
import type { Node } from 'react';

type TooltipProps = {
  a?: Node,
  b?: Node,
};

class Tooltip extends Component<TooltipProps> {
  render() {
    return <div />
  }
}

type CProps = { a: Node };

const C = ({a}: CProps) => a;

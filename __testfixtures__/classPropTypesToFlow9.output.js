// @flow
import React, { Component } from 'react';
import type { Node } from 'react';

type TooltipProps = {
  headline: string,
  children?: Node,
  text?: string,
  shouldBeShown?: boolean,
  icon?: 'default' | 'custom',
  time?: number | string,
  size: {
    width: number,
    height: number,
  },
  fonts?: string[],
  onShow?: Function,
  position?: {},
  colors?: any[],
};

class Tooltip extends Component<TooltipProps> {
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

type OtherComponentProps = {
  a?: string,
  b?: number,
};

class OtherComponent extends Component<OtherComponentProps> {
  render() {
    return <div />
  }
}

type FunctionalCompProps = {
  c: string,
  d?: number,
};

const FunctionalComp = (props: FunctionalCompProps) => <div />;

type FunctionalComp2Props = {
  e?: string,
  f: number,
};

function FunctionalComp2(props: FunctionalComp2Props) {
  return <div />;
}

type ClassComponent3Props = {
  g?: string,
  h?: number,
};

class ClassComponent3 extends Component<ClassComponent3Props> {
  render() {
    return <div />
  }
}

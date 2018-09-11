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

type OtherComponentProps = {
  a?: string,
  b?: number,
};

class OtherComponent extends React.Component<OtherComponentProps> {
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

class ClassComponent3 extends React.Component<ClassComponent3Props> {
  render() {
    return <div />
  }
}

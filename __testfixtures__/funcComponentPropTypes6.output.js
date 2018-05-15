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
  fonts?: string[],
  onShow?: Function,
  position?: {},
  colors?: any[],
};

const Tooltip = (props: TooltipProps) => {
  const { text, icon } = props;
  if (!text) {
    return null;
  }
  return <div />;
};

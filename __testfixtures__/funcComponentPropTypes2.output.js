// @flow
import React, { Component } from 'react';
import type { Node } from 'react';

type Props = {
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

const Tooltip = (props: Props) => {
  const { text, icon } = props;
  return <div />;
};

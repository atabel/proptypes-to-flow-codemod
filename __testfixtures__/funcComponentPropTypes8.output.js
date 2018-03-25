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

const Tooltip = ({ text, icon }: TooltipProps) => (
  <div />
);

type Tooltip2Props = {
  text?: string,
  icon?: string,
};

const Tooltip2 = ({ text, icon }: Tooltip2Props) => (
  <div />
);

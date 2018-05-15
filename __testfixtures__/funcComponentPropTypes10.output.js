// @flow
import * as React from 'react';

type Props = {
  text?: string,
  children: React.Node,
};

const Tooltip = ({ text, children }: Props) => (
  <div>{children}</div>
);

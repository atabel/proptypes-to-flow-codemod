// @flow
import React from 'react';
import {useSheet} from 'jss';

type Props = {
  text?: string,
  icon?: string,
  classes: *,
};

const Tooltip = ({ text, icon }: Props) => (
  <div />
);

export default useSheet(sheet)(Tooltip);

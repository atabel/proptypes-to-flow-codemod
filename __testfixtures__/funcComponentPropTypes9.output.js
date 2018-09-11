// @flow
import React from 'react';
import {useSheet, createSheet} from 'jss';

const sheet = createSheet({});

type Props = {
  text?: string,
  icon?: string,
  classes: typeof sheet,
};

const Tooltip = ({ text, icon }: Props) => (
  <div />
);

export default useSheet(sheet)(Tooltip);

// @flow
import React from 'react';
import {useSheet, createSheet} from 'jss';

const sheet = createSheet({});

type Props = { classes: typeof sheet };

class Tooltip extends React.Component<Props> {
  render() {
    return <div />
  }
}

export default useSheet(sheet)(Tooltip);

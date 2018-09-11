import React from 'react';
import {useSheet, createSheet} from 'jss';

const sheet = createSheet({});

class Tooltip extends React.Component {
  render() {
    return <div />
  }
}

export default useSheet(sheet)(Tooltip);

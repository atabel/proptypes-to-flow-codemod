// @flow
import * as React from 'react';
import {useSheet} from 'jss';

type Props = {
  a?: React.Node,
  b?: React.Node,
  classes: *,
};

class Tooltip extends React.Component<Props> {
  render() {
    return <div />
  }
}

export default useSheet(sheet)(Tooltip);

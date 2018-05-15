import React from 'react';
import t from 'prop-types';

class Tooltip extends React.PureComponent {
  static propTypes = {
    headline: t.string.isRequired,
    children: t.node,
    text: t.string,
    shouldBeShown: t.bool,
    icon: t.oneOf(['default', 'custom']),
    time: t.oneOfType([t.number, t.string]),
    size: t.shape({
      width: t.number,
      height: t.number
    }).isRequired,
    fonts: t.arrayOf(t.string),
    onShow: t.func,
    position: t.object,
    colors: t.array,
  };

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

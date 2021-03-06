import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css, withStyles, withStylesPropTypes } from '../../doit-ui/withStyles';
import AppNav, { HEIGHT } from './AppNav';

class AppLayout extends PureComponent {
  render() {
    const { children, styles } = this.props;
    return (
      <div {...css(styles.wrapper)}>
        <AppNav />
        <div {...css(styles.body)}>{children}</div>
      </div>
    );
  }
}

AppLayout.propTypes = {
  ...withStylesPropTypes,
  children: PropTypes.node,
};

export default withStyles(({ unit }) => ({
  wrapper: {
    marginTop: HEIGHT,
    maxWidth: '1080px',
    margin: '0 auto',
  },
  body: {
    padding: unit * 4,
    marginTop: HEIGHT,
  },
}))(AppLayout);

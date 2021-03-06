import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite/lib/aphroditeInterface';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import Theme from '../doit-ui/Theme';

ThemedStyleSheet.registerTheme(Theme);
ThemedStyleSheet.registerInterface(aphroditeInterface);

export { css, withStyles, withStylesPropTypes, ThemedStyleSheet };
export default withStyles;

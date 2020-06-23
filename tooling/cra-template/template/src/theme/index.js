import foundations from './foundations';
import components from './components';
import styles from './styles';
/**
 * Color mode config
 */
const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};
const theme = {
  ...foundations,
  components,
  styles,
  config,
};
export default theme;

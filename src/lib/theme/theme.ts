import { createTheme } from '@mui/material';
import colors from './colors';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      contrastText: colors.text,
      dark:colors.primaryDark,
    },
    secondary: {
      main: colors.secondary,
      dark: colors.secondaryDark,
      contrastText: colors.textInverted,
    },
    background: { default: colors.background, paper: colors.paper },
    text: { primary: colors.text, disabled: colors.textDisabled },
  },

});
export default theme;

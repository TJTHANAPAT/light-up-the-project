import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
const theme = createTheme({
  palette: {
    primary: {
      light: '#ffedd9',
      main: '#ff7300',
      dark: '#f26e00',
      contrastText: '#ffffff',
    },
    secondary: blue,
  },
  typography: {
    fontFamily: [
      '"Kanit"',
      'sans-serif',
    ].join(','),
  },
});

export default function CustomMuiTheme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

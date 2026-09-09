import '@fontsource-variable/open-sans';
import { createTheme } from '@mui/material';
import colors from '../colors';

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans Variable"
  },
  palette: {
    primary: {
      main: colors.primary,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Open Sans",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.Mui-focused': {
            color: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '8px',
        },
        "backdrop": {
          backdropFilter: "blur(2px)"
        }
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          background: colors.primary
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: colors.white
        }
      }
    }
  },
});

export default theme;
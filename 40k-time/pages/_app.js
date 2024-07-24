// pages/_app.js
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#cbf2f5",
    },
    secondary: {
      main: "#42daf5",
    },
    alert: {
        main: "#ff0000",
    },
    tertiary: {
        main: "#006400",
    },
    background: {
        default: "#3b3a3a",
        paper: "#3d3d3d",
    },        
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});


export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
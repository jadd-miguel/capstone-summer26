import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <title>NaviSkill AI</title>
    <App />
  </StrictMode>,
)
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App'; // <--- THIS WAS MISSING
import './global.css';

const theme = createTheme({
  palette: {
    primary: { main: '#0A192F' }, // The Corporate Navy
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);

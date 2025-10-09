'use client';

import { ThemeOptions } from '@mui/material/styles';

const isDarkMode = true;

// https://muiv6-theme-creator.web.app/?tab=preview
const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
      light: '#1976d2',
      dark: '#1976d2'
    },
    secondary: {
      main: '#dc004e',
      light: '#dc004e',
      dark: '#dc004e'
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828'
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100'
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b'
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20'
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161'
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e'
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)'
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    action: {
      active: 'rgba(255, 255, 255, 0.7)',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      focus: 'rgba(0, 0, 0, 0.12)'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14
  },
  spacing: 8,
  shape: {
    borderRadius: 4
  },
  transitions: {
    duration: {
      standard: 300
    }
  }
};

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#1976d2',
      dark: '#1976d2'
    },
    secondary: {
      main: '#dc004e',
      light: '#dc004e',
      dark: '#dc004e'
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828'
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100'
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b'
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20'
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161'
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)'
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      focus: 'rgba(0, 0, 0, 0.12)'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14
  },
  spacing: 8,
  shape: {
    borderRadius: 4
  },
  transitions: {
    duration: {
      standard: 300
    }
  }
};

export const themeOptions: ThemeOptions = isDarkMode ? darkTheme : lightTheme;
import { createTheme } from '@mui/material';

const themeEasyClass = createTheme(
    {
        palette: {
            primary: {
                main: '#0999',
            },
            secondary: {
                main: '#9999',
            },
        },
        components: {
            // Example
            MuiListItem: {
                styleOverrides: {
                    root: {
                        color: 'black',
                    }
                }
            },
        },
        typography: {
            // Example for typography variant = ''
            title: {
                color: 'black'
            },
        }
    },
);

export default themeEasyClass;
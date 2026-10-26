import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function CssBaseline(theme: Theme) {
    return {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    boxSizing: 'border-box',
                    scrollbarWidth: 'thin',
                    scrollbarColor: `${theme.palette.background.layer5} ${theme.palette.background.default}`
                },
                html: {
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    height: '100%',
                    WebkitOverflowScrolling: 'touch'
                },
                body: {
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    height: '100%'
                },
                input: {
                    '&[type=number]': {
                        MozAppearance: 'textfield',
                        '&::-webkit-outer-spin-button': {
                            margin: 0,
                            WebkitAppearance: 'none'
                        },
                        '&::-webkit-inner-spin-button': {
                            margin: 0,
                            WebkitAppearance: 'none'
                        }
                    }
                },
                img: {
                    maxWidth: '100%',
                    display: 'inline-block',
                    verticalAlign: 'bottom'
                },
                '::-webkit-scrollbar': {
                    width: '10px'
                },
                '::-webkit-scrollbar-track': {
                    backgroundColor: theme.palette.background.layer5
                },
                '::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.background.layer5,
                    borderRadius: '5px'
                },
                '::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: theme.palette.background.layer5
                }
            }
        }
    };
}

import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function List(theme: Theme) {
    return {
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: 'inherit',
                    minWidth: 'auto',
                    marginRight: theme.spacing(2)
                }
            }
        },
        MuiListItemAvatar: {
            styleOverrides: {
                root: {
                    minWidth: 'auto',
                    marginRight: theme.spacing(2)
                }
            }
        },
        MuiListItemText: {
            defaultProps: {
                primaryTypographyProps: {
                    typography: 'subtitle2'
                },
                secondaryTypographyProps: {
                    component: 'span'
                }
            },

            styleOverrides: {
                root: {
                    margin: 0
                },
                multiline: {
                    margin: 0
                }
            }
        }
    };
}

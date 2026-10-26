import { Theme, alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Paper(theme: Theme) {
    return {
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none'
                },
                outlined: {
                    borderColor: alpha(theme.palette.grey[500], 0.16)
                }
            }
        }
    };
}

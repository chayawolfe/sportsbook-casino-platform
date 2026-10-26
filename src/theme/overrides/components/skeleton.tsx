import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Skeleton(theme: Theme) {
    return {
        MuiSkeleton: {
            defaultProps: {
                animation: 'wave',
                variant: 'rounded'
            },
            styleOverrides: {
                root: {
                    backgroundColor: theme.palette.background.default
                },
                rounded: {
                    borderRadius: theme.shape.borderRadius * 2
                }
            }
        }
    };
}

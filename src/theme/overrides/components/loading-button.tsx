import { Theme } from '@mui/material/styles';
import { LoadingButtonProps } from '@mui/lab/LoadingButton';

// ----------------------------------------------------------------------

export default function LoadingButton(theme: Theme) {
    return {
        MuiLoadingButton: {
            styleOverrides: {
                root: ({ ownerState }: { ownerState: LoadingButtonProps }) => ({
                    ...(ownerState.variant === 'soft' && {
                        '& .MuiLoadingButton-loadingIndicatorStart': {
                            left: 10
                        },
                        '& .MuiLoadingButton-loadingIndicatorEnd': {
                            right: 14
                        },
                        ...(ownerState.size === 'small' && {
                            '& .MuiLoadingButton-loadingIndicatorStart': {
                                left: 10
                            },
                            '& .MuiLoadingButton-loadingIndicatorEnd': {
                                right: 10
                            }
                        })
                    })
                })
            }
        }
    };
}

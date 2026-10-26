import { Theme, alpha } from '@mui/material/styles';
import { AlertProps, alertClasses } from '@mui/material/Alert';
// components
import Iconify from 'components/iconify';

// ----------------------------------------------------------------------

const COLORS = ['info', 'success', 'warning', 'error'] as const;

// ----------------------------------------------------------------------

export default function Alert(theme: Theme) {
    const isLight = theme.palette.mode === 'light';

    const rootStyles = (ownerState: AlertProps) => {
        const standardVariant = ownerState.variant === 'standard';

        const filledVariant = ownerState.variant === 'filled';

        const outlinedVariant = ownerState.variant === 'outlined';

        const colorStyle = COLORS.map((color) => ({
            ...(ownerState.severity === color && {
                // STANDARD
                ...(standardVariant && {
                    color: theme.palette[color][isLight ? 'darker' : 'lighter'],
                    backgroundColor: theme.palette[color][isLight ? 'lighter' : 'darker'],
                    [`& .${alertClasses.icon}`]: {
                        color: theme.palette[color][isLight ? 'main' : 'light']
                    }
                }),
                // FILLED
                ...(filledVariant && {
                    color: theme.palette[color].contrastText,
                    backgroundColor: theme.palette[color].main
                }),
                // OUTLINED
                ...(outlinedVariant && {
                    backgroundColor: alpha(theme.palette[color].main, 0.08),
                    color: theme.palette[color][isLight ? 'dark' : 'light'],
                    border: `solid 1px ${alpha(theme.palette[color].main, 0.16)}`,
                    [`& .${alertClasses.icon}`]: {
                        color: theme.palette[color].main
                    }
                })
            })
        }));

        return [...colorStyle];
    };

    return {
        MuiAlert: {
            defaultProps: {
                iconMapping: {
                    error: <Iconify icon="solar:danger-bold" width={24} />,
                    info: <Iconify icon="eva:info-fill" width={24} />,
                    success: <Iconify icon="eva:checkmark-circle-2-fill" width={24} />,
                    warning: <Iconify icon="eva:alert-triangle-fill" width={24} />
                }
            },

            styleOverrides: {
                root: ({ ownerState }: { ownerState: AlertProps }) => rootStyles(ownerState),
                icon: {
                    opacity: 1
                }
            }
        },
        MuiAlertTitle: {
            styleOverrides: {
                root: {
                    marginBottom: theme.spacing(0.5),
                    fontWeight: theme.typography.fontWeightSemiBold
                }
            }
        }
    };
}

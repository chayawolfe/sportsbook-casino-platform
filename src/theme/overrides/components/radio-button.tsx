import { Theme } from '@mui/material/styles';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

// ----------------------------------------------------------------------

const Icon = (props: SvgIconProps) => (
    <SvgIcon {...props}>
        <path d="M12 2A10 10 0 1 1 2 12C2 6.477 6.477 2 12 2Zm0 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z" />
    </SvgIcon>
);

const CheckedIcon = (props: SvgIconProps) => (
    <SvgIcon {...props}>
        <path d="M12 2A10 10 0 1 1 2 12C2 6.477 6.477 2 12 2Zm0 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
    </SvgIcon>
);

export default function Radio(theme: Theme) {
    return {
        // CHECKBOX, RADIO, SWITCH
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    ...theme.typography.body2
                }
            }
        },

        MuiRadio: {
            defaultProps: {
                size: 'small',
                icon: <Icon />,
                checkedIcon: <CheckedIcon />
            },

            styleOverrides: {
                root: {
                    padding: theme.spacing(1)
                }
            }
        }
    };
}

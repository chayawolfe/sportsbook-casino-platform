import { alpha, Theme } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import SvgIcon, { SvgIconProps, svgIconClasses } from '@mui/material/SvgIcon';
//
import { paper, menuItem } from '../../css';

// ----------------------------------------------------------------------

export default function Autocomplete(theme: Theme) {
    const Icon = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <path d="M12,16 C11.7663478,16.0004565 11.5399121,15.9190812 11.36,15.77 L5.36,10.77 C4.93474074,10.4165378 4.87653776,9.78525926 5.23,9.36 C5.58346224,8.93474074 6.21474074,8.87653776 6.64,9.23 L12,13.71 L17.36,9.39 C17.5665934,9.2222295 17.8315409,9.14373108 18.0961825,9.17188444 C18.3608241,9.2000378 18.6033268,9.33252029 18.77,9.54 C18.9551341,9.74785947 19.0452548,10.0234772 19.0186853,10.3005589 C18.9921158,10.5776405 18.8512608,10.8311099 18.63,11 L12.63,15.83 C12.444916,15.955516 12.2231011,16.0153708 12,16 Z" />
        </SvgIcon>
    );

    return {
        MuiAutocomplete: {
            defaultProps: {
                popupIcon: <Icon />
            },

            styleOverrides: {
                root: {
                    [`& span.${autocompleteClasses.tag}`]: {
                        ...theme.typography.subtitle2,
                        height: 24,
                        minWidth: 24,
                        lineHeight: '24px',
                        textAlign: 'center',
                        padding: theme.spacing(0, 0.75),
                        color: theme.palette.text.secondary,
                        borderRadius: theme.shape.borderRadius,
                        backgroundColor: alpha(theme.palette.grey[500], 0.16)
                    }
                },
                paper: {
                    ...paper({ theme, dropdown: true })
                },
                listbox: {
                    padding: 0,
                    [`& .${autocompleteClasses.option}`]: {
                        ...menuItem(theme)
                    }
                },
                endAdornment: {
                    [`& .${svgIconClasses.root}`]: {
                        width: 18,
                        height: 18
                    }
                }
            }
        }
    };
}

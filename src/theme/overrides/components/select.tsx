import { Theme } from '@mui/material/styles';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

// ----------------------------------------------------------------------

export default function Select(theme: Theme) {
    const Icon = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <path d="M12,16 C11.7663478,16.0004565 11.5399121,15.9190812 11.36,15.77 L5.36,10.77 C4.93474074,10.4165378 4.87653776,9.78525926 5.23,9.36 C5.58346224,8.93474074 6.21474074,8.87653776 6.64,9.23 L12,13.71 L17.36,9.39 C17.5665934,9.2222295 17.8315409,9.14373108 18.0961825,9.17188444 C18.3608241,9.2000378 18.6033268,9.33252029 18.77,9.54 C18.9551341,9.74785947 19.0452548,10.0234772 19.0186853,10.3005589 C18.9921158,10.5776405 18.8512608,10.8311099 18.63,11 L12.63,15.83 C12.444916,15.955516 12.2231011,16.0153708 12,16 Z" />
        </SvgIcon>
    );

    return {
        MuiSelect: {
            defaultProps: {
                IconComponent: Icon
            },
            styleOverrides: {
                icon: {
                    right: 10,
                    width: 18,
                    height: 18,
                    top: 'calc(50% - 9px)'
                }
            }
        },
        MuiNativeSelect: {
            defaultProps: {
                IconComponent: Icon
            },
            styleOverrides: {
                icon: {
                    right: 10,
                    width: 18,
                    height: 18,
                    top: 'calc(50% - 9px)'
                }
            }
        }
    };
}

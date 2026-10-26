import { Theme } from '@mui/material/styles';
//
import { menuItem } from '../../css';

// ----------------------------------------------------------------------

export default function Menu(theme: Theme) {
    return {
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    ...menuItem(theme)
                }
            }
        }
    };
}

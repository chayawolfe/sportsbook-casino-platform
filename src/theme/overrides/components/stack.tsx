import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Stack(theme: Theme) {
    return {
        MuiStack: {
            defaultProps: {
                useFlexGap: true
            }
        }
    };
}

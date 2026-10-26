import { alpha, lighten } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

declare module '@mui/material/styles/createPalette' {
    interface TypeBackground {
        footer: string;
        card: string;
        button1: string;
        layer1: string;
        layer2: string;
        layer3: string;
        layer4: string;
        layer5: string;
        tab: string;
        seletedTab: string;
        tableContainer: string;
        banner: string;
        modal: string;
    }
    interface SimplePaletteColorOptions {
        lighter: string;
        darker: string;
    }
    interface PaletteColor {
        lighter: string;
        darker: string;
    }
}

// SETUP COLORS

const GREY = {
    0: '#FFFFFF',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#142426',
    900: '#161C24'
};

// const PRIMARY = {
//     lighter: '#C8FAD6',
//     light: '#5BE49B',
//     main: '#00A76F',
//     dark: '#007867',
//     darker: '#004B50',
//     contrastText: '#FFFFFF'
// };
const PRIMARY = {
    lighter: '#1dca6a',
    light: '#9fe871',
    main: '#24ee89',
    dark: '#23ee884d',
    darker: '#2c5040',
    contrastText: '#FFFFFF'
};

const SECONDARY = {
    lighter: '#EFD6FF',
    light: '#C684FF',
    main: '#8E33FF',
    dark: '#5119B7',
    darker: '#27097A',
    contrastText: '#FFFFFF'
};

const INFO = {
    lighter: '#CAFDF5',
    light: '#61F3F3',
    main: '#00B8D9',
    dark: '#006C9C',
    darker: '#003768',
    contrastText: '#FFFFFF'
};

const SUCCESS = {
    lighter: '#D3FCD2',
    light: '#77ED8B',
    main: '#22C55E',
    dark: '#118D57',
    darker: '#065E49',
    contrastText: '#ffffff'
};

const WARNING = {
    lighter: '#FFF5CC',
    light: '#FFD666',
    main: '#FFAB00',
    dark: '#B76E00',
    darker: '#7A4100',
    contrastText: GREY[800]
};

const ERROR = {
    lighter: '#FFE9D5',
    light: '#FFAC82',
    main: '#FF5630',
    dark: '#B71D18',
    darker: '#7A0916',
    contrastText: '#FFFFFF'
};

const COMMON = {
    common: {
        black: '#000000',
        white: '#FFFFFF'
    },
    primary: PRIMARY,
    secondary: SECONDARY,
    info: INFO,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    grey: GREY,
    divider: alpha(GREY[500], 0.2),
    action: {
        selected: alpha(GREY[500], 0.16),
        disabled: alpha(GREY[500], 0.8),
        disabledBackground: alpha(GREY[500], 0.24),
        focus: alpha(GREY[500], 0.24),
        hoverOpacity: 0.08,
        disabledOpacity: 0.48
    }
};

export function palette(mode: 'light' | 'dark') {
    const light = {
        ...COMMON,
        mode: 'light',
        text: {
            primary: GREY[800],
            secondary: GREY[600],
            disabled: GREY[500]
        },
        background: {
            border: '#212B36',
            button1: '#20252c1a',
            card: '#FFFFFF',
            paper: '#FFFFFF',
            default: '#f4f4f4',
            footer: '#fbfbfb',
            layer1: '#ffffff',
            layer2: '#f9f9f9',
            layer3: '#f7f7f7',
            layer4: '#ffffff',
            layer5: '#f0f2f2',
            button: '#0000000d',
            neutral: GREY[200],
            sidebarCell: '#3237380d',
            brightButton: '#ededed',
            site: '#f4f4f4',
            tab: '#e4e6e7',
            seletedTab: '#ffffff',
            tableContainer: '#FFFFFF1A',
            banner: '#b0ffd833',
            modal: '#ffffffc9'
        },
        action: {
            ...COMMON.action,
            active: GREY[600]
        }
    };

    const dark = {
        ...COMMON,
        mode: 'dark',
        text: {
            primary: '#FFFFFF',
            secondary: GREY[500],
            disabled: GREY[600]
        },
        background: {
            border: '#353b3c',
            card: '#1c3c3c',
            button1: '#142426',
            paper: GREY[800],
            default: '#142426',
            layer1: '#142426',
            layer5: '#294245',
            footer: '#142426',
            button: '#294245',
            layer2: '#323738',
            layer3: '#294245',
            layer4: '#142426',
            brightButton: '#464f50',
            neutral: GREY[200],
            sidebarCell: 'rgba(255, 255, 255, .05)',
            site: '#142426',
            tab: '#323738',
            seletedTab: '#294245',
            tableContainer: '#323738',
            banner: '#00000033',
            modal: 'transparent'
        },
        action: {
            ...COMMON.action,
            active: GREY[500],
            button: lighten('#3a4142', 0.05)
        }
    };

    return mode === 'light' ? light : dark;
    // return mode !== 'light' ? dark : dark;
    // return mode !== 'light' ? light : light;
}

import { useMemo } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import {
    createTheme,
    ThemeOptions,
    StyledEngineProvider,
    ThemeProvider as MUIThemeProvider
} from '@mui/material/styles';

import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import { customShadows } from './custom-shadows';
import { componentsOverrides } from './overrides';
import { useSettingsContext } from 'components/settings';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
    const settings = useSettingsContext();

    const themeOptions = useMemo(
        () => ({
            palette: palette(settings.themeMode),
            shadows: shadows(settings.themeMode),
            customShadows: customShadows(settings.themeMode),
            typography,
            spacing: 8,
            shape: { borderRadius: 4 },
            direction: settings.themeDirection,
            contrast: settings.themeContrast,
            layout: settings.themeLayout,
            colorPresets: settings.themeColorPresets,
            stretch: settings.themeStretch
        }),
        [settings]
    );

    const theme = createTheme(themeOptions as ThemeOptions);

    theme.components = componentsOverrides(theme);

    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </StyledEngineProvider>
    );
}

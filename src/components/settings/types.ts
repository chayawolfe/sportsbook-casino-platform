// ----------------------------------------------------------------------

export type SettingsValueProps = {
    themeStretch: boolean;
    themeMode: 'light' | 'dark';
    themeDirection: 'rtl' | 'ltr';
    themeContrast: 'default' | 'bold';
    themeLayout: 'vertical' | 'horizontal' | 'mini';
    themeColorPresets: 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red';
};

export type IModalType = '' | 'SIGNIN' | 'SIGNUP' | 'PASSWORD' | 'EXPLORE' | 'DEPOSIT' | 'LANGUAGE' | 'SPIN';

export type SettingsContextProps = SettingsValueProps & {
    // Update
    onUpdate: (name: string, value: string | boolean) => void;
    // Direction by lang
    onChangeDirectionByLang: (lang: string) => void;
    // Reset
    canReset: boolean;
    onReset: VoidFunction;
    // Drawer
    open: boolean;
    onToggle: VoidFunction;
    onClose: VoidFunction;
    // Modal
    modal: IModalType;
    onToggleModal: (modal: IModalType) => void;
};

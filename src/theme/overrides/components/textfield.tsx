import { alpha, Theme } from '@mui/material/styles';
import { inputBaseClasses } from '@mui/material/InputBase';
import { inputLabelClasses } from '@mui/material/InputLabel';
import { filledInputClasses } from '@mui/material/FilledInput';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

// ----------------------------------------------------------------------

export default function TextField(theme: Theme) {
    const color = {
        focused: '#24ee89',
        active: '#637381',
        placeholder: theme.palette.text.disabled
    };

    const font = {
        label: theme.typography.body1,
        value: theme.typography.body2
    };

    return {
        // HELPER
        MuiFormHelperText: {
            defaultProps: {
                component: 'div'
            },
            styleOverrides: {
                root: {
                    marginTop: theme.spacing(1)
                }
            }
        },

        // LABEL
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    ...font.value,
                    color: color.active,
                    [`&.${inputLabelClasses.shrink}`]: {
                        ...font.label,
                        fontWeight: 600,
                        color: color.active,
                        [`&.${inputLabelClasses.focused}`]: {
                            color: color.focused
                        },
                        [`&.${inputLabelClasses.error}`]: {
                            color: theme.palette.error.main
                        },
                        [`&.${inputLabelClasses.disabled}`]: {
                            color: theme.palette.text.disabled
                        },
                        [`&.${inputLabelClasses.filled}`]: {
                            transform: 'translate(12px, 6px) scale(0.75)'
                        }
                    }
                }
            }
        },

        // BASE
        MuiInputBase: {
            styleOverrides: {
                borderRadius: theme.shape.borderRadius * 2,
                root: {
                    [`&.${inputBaseClasses.disabled}`]: {
                        '& svg': {
                            color: theme.palette.text.disabled
                        }
                    }
                },
                input: {
                    ...font.value,
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    '&::placeholder': {
                        opacity: 1,
                        color: color.placeholder
                    }
                }
            }
        },

        // OUTLINED
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: theme.shape.borderRadius * 2,
                    backgroundColor: theme.palette.background.layer4,
                    [`&.${outlinedInputClasses.focused}`]: {
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: color.focused
                        }
                    },
                    [`&.${outlinedInputClasses.error}`]: {
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: theme.palette.error.main
                        }
                    },
                    [`&.${outlinedInputClasses.disabled}`]: {
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: theme.palette.action.disabledBackground
                        }
                    }
                },
                notchedOutline: {
                    borderColor: '#3a4142',
                    transition: theme.transitions.create(['border-color'], {
                        duration: theme.transitions.duration.shortest
                    }),
                    [`&:hover`]: {
                        borderColor: color.active
                    }
                },
                input: {
                    '&.MuiInputBase-inputSizeSmall': {
                        padding: '10px 14px'
                    }
                }
            }
        },

        // FILLED
        MuiFilledInput: {
            defaultProps: {
                disableUnderline: true
            },
            styleOverrides: {
                root: {
                    borderRadius: theme.shape.borderRadius * 2,
                    backgroundColor: alpha(theme.palette.grey[500], 0.08),
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.grey[500], 0.16)
                    },
                    [`&.${filledInputClasses.focused}`]: {
                        backgroundColor: alpha(theme.palette.grey[500], 0.16)
                    },
                    [`&.${filledInputClasses.error}`]: {
                        backgroundColor: alpha(theme.palette.error.main, 0.08),
                        [`&.${filledInputClasses.focused}`]: {
                            backgroundColor: alpha(theme.palette.error.main, 0.16)
                        }
                    },
                    [`&.${filledInputClasses.disabled}`]: {
                        backgroundColor: theme.palette.action.disabledBackground
                    }
                }
            }
        }
    };
}

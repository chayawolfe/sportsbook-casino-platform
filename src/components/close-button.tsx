import { Close } from '@mui/icons-material';
import { IconButton, IconButtonProps, styled } from '@mui/material';

export const CloseButton = styled((props: IconButtonProps) => (
    <IconButton {...props}>
        <Close />
    </IconButton>
))(({ theme }) => ({
    color: theme.palette.text.secondary,
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.standard
    }),
    '&:hover': {
        color: theme.palette.text.primary,
        transform: 'rotate(-90deg)'
    }
}));

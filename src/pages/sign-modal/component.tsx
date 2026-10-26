import { styled } from '@mui/material/styles';
import { Button, IconButton } from '@mui/material';

export const CloseButton = styled(Button)(({ theme }) => ({
    minWidth: '32px',
    width: '32px',
    height: '32px',
    padding: 0,
    backgroundColor: theme.palette.background.layer1,
    '&:hover': {
        filter: 'brightness(1.05)'
    }
}));

export const SocialLoginButton = styled(IconButton)(({ theme }) => ({
    width: '40px',
    height: '40px',
    border: '1px solid',
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius * 2,
    padding: 0,
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    }
}));

import { styled } from '@mui/material/styles';

import Button, { ButtonProps } from '@mui/material/Button';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderRadius: '4px',
    textTransform: 'uppercase',
    height: '2.5rem',
    color: '#22E9A7',
    backgroundColor: '#21dc9f42',
    border: '1px solid #22E9A740'
}));

export default ColorButton;

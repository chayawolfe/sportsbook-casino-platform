import React, { useState, ChangeEvent, useEffect } from 'react';
import { Box, Button, InputBase, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const StyledInput = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
        width: '2ch',
        textAlign: 'center',
        padding: '4px',
        color: theme.palette.text.primary
    }
}));

const PaginationButton = styled(Button)(({ theme }) => ({
    minWidth: '32px',
    width: '32px',
    height: '40px',
    padding: 0,
    backgroundColor: theme.palette.background.layer1,
    '&:hover': {
        filter: 'brightness(1.05)'
    }
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.15rem'
}));

const PageInfoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.layer1,
    fontSize: 14,
    fontWeight: 600
}));

const TotalPagesBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    minWidth: '32px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const [inputValue, setInputValue] = useState(currentPage.toString());

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        const newPage = parseInt(inputValue);
        if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        } else {
            setInputValue(currentPage.toString());
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleInputBlur();
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
            setInputValue((currentPage - 1).toString());
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
            setInputValue((currentPage + 1).toString());
        }
    };

    useEffect(() => {
        if (currentPage.toString() !== inputValue) {
            setInputValue(String(currentPage));
        }
        // eslint-disable-next-line
    }, [currentPage]);

    return (
        <PaginationContainer sx={{ mt: { xs: 2, sm: 4 } }}>
            <ButtonGroup>
                <PaginationButton
                    onClick={goToPrevPage}
                    disabled={currentPage <= 1}
                    sx={{ borderRadius: '8px 0 0 8px' }}
                >
                    <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
                </PaginationButton>

                <PageInfoContainer>
                    <StyledInput
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyPress={handleKeyPress}
                    />
                    <Typography variant="inherit" sx={{ color: 'text.secondary' }}>
                        of
                    </Typography>
                    <TotalPagesBox>
                        <Typography variant="inherit">{totalPages.toString().padStart(2, '0')}</Typography>
                    </TotalPagesBox>
                </PageInfoContainer>

                <PaginationButton
                    onClick={goToNextPage}
                    disabled={currentPage >= totalPages}
                    sx={{ borderRadius: '0 8px 8px 0' }}
                >
                    <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                </PaginationButton>
            </ButtonGroup>
        </PaginationContainer>
    );
};

export default Pagination;

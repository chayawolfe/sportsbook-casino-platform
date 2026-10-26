import { Box, Stack, Tab, Tabs, Typography, styled } from '@mui/material';
import { _playerBets } from '_mock';
import { useState } from 'react';
import AllBet from './all-bet';
import HighRoller from './high-roller';
import Mybet from './my-bet';
import WagerContest from './wager-contest';
import { useTranslate } from 'locales';

const StyledTabs = styled(Tabs)(({ theme }) => ({
    minHeight: '40px',
    width: '100%',
    maxWidth: 'fit-content',
    backgroundColor: theme.palette.background.tab,
    borderRadius: 7,
    '& .MuiTabs-indicator': {
        height: '100%',
        backgroundColor: theme.palette.background.seletedTab,
        borderRadius: 7
    },
    '& .MuiTabs-scrollButtons': {
        display: 'none'
    }
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    minHeight: '40px',
    padding: '6px 28px',
    borderRadius: 7,
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '14px',
    color: theme.palette.text.secondary,
    zIndex: 1,
    '&.Mui-selected': {
        color: theme.palette.text.primary
    },
    '&:not(:last-of-type)': {
        marginRight: 0
    }
}));

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

const GameTable = () => {
    const [value, setValue] = useState(0);
    const { t } = useTranslate();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', mt: '1.5rem' }}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'start', sm: 'center' }}
                sx={{ mb: 3, gap: 1 }}
            >
                <Typography sx={{ fontSize: 16, fontWeight: 800 }}>{t('latest_round&_race')}</Typography>

                <StyledTabs value={value} onChange={handleChange}>
                    <StyledTab label="All bets" />
                    <StyledTab label="My bets" />
                    <StyledTab label="High roller" />
                    <StyledTab label="Wager Contest" />
                </StyledTabs>
            </Stack>

            <TabPanel value={value} index={0}>
                <AllBet data={_playerBets} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Mybet data={_playerBets} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <HighRoller data={_playerBets} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <WagerContest />
            </TabPanel>
        </Box>
    );
};

export default GameTable;

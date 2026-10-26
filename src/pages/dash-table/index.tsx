import { Box, Stack, Tab, Tabs, Typography, styled } from '@mui/material';
import { _playerBets } from '_mock';
import { useState } from 'react';
import LatestBet from './latest-bet';
// import HighRoller from './high-roller';
// import WagerContest from './wager-contest';
import { useTranslate } from 'locales';

const StyledTabs = styled(Tabs)(({ theme }) => ({
    minHeight: '40px',
    borderRadius: 0,
    borderBottom: '2px solid',
    borderImage: 'linear-gradient(180deg, #9BE849 0%, #22E9A7 100%) 1',
    position: 'relative',
    '& .MuiTabs-indicator': {
        height: '3px',
        background: 'linear-gradient(90deg, #9BE849 0%, #22E9A7 100%)',
        bottom: 0
    },
    '& .MuiTabs-scrollButtons': {
        display: 'none'
    }
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    minHeight: '40px',
    padding: '6px 28px',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '14px',
    color: theme.palette.text.secondary,
    zIndex: 1,
    background: 'transparent',
    transition: 'background 0.3s, color 0.3s',
    '&.Mui-selected': {
        color: '#fff',
        background: 'linear-gradient(90deg, #9BE849 0%, #22E9A7 100%)',
        zIndex: 2
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

const DashTable = () => {
    const [value, setValue] = useState(0);
    const { t } = useTranslate();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', mt: '1.5rem' }}>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', md: 'center' }}
                sx={{ mb: 3 }}
            >
                <Typography sx={{ fontSize: { md: '40px', xs: '16px' }, fontWeight: 800 }}>
                    {t('latest_round&_race')}
                </Typography>
            </Stack>

            <StyledTabs value={value} onChange={handleChange}>
                <StyledTab label={t('latestBet')} />
                {/* <StyledTab label={t('highRoller')} />
                <StyledTab label={t('wagerContest')} /> */}
            </StyledTabs>

            <TabPanel value={value} index={0}>
                <LatestBet />
            </TabPanel>
            {/* <TabPanel value={value} index={1}>
                <HighRoller data={_playerBets} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <WagerContest />
            </TabPanel> */}
        </Box>
    );
};

export default DashTable;

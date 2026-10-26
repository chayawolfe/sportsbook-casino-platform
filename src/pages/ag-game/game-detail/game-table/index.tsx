import { Box, Tab, Tabs, styled } from '@mui/material';
import { _winPlayers } from '_mock';
import { useState } from 'react';
import GameDescription from './game-description';
import HighWin from './high-win';
import LuckyWin from './luck-win';

const StyledTabs = styled(Tabs)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 'fit-content',
    minHeight: '40px',
    padding: '5px',
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
    minHeight: '36px',
    padding: '0px 20px',
    borderRadius: 7,
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '14px',
    color: '#637381',
    zIndex: 1,
    '&.Mui-selected': {
        color: '#fff'
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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <StyledTabs value={value} onChange={handleChange}>
                <StyledTab label="High win" />
                <StyledTab label="Lucky win" />
                <StyledTab label="Description" />
            </StyledTabs>

            <TabPanel value={value} index={0}>
                <HighWin data={_winPlayers} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <LuckyWin data={_winPlayers} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <GameDescription />
            </TabPanel>
        </Box>
    );
};

export default GameTable;

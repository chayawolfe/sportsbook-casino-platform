import React, { useEffect } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import Banner from 'components/banner';
import { tabs } from 'data';
import { usePathname, useRouter } from 'routes/hook';
import { swiperArray } from 'config/constant';

import Casino from './casino';
import Lobby from './lobby';
import Slots from './slots';
import { useTranslate } from 'locales';

const StyledTabs = styled(Tabs)(({ theme }) => ({
    marginTop: 16,
    minHeight: '40px',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 7,
    scrollButtons: 'auto',
    '& .MuiTabs-indicator': {
        height: '100%',
        backgroundColor: theme.palette.background.tab,
        borderRadius: 7
    },
    '& .MuiTabs-scrollButtons': {
        display: 'none'
    }
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    minHeight: '40px',
    padding: '0px 8px',
    borderRadius: 7,
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: 1,
    color: theme.palette.text.secondary,
    zIndex: 1,
    '&.Mui-selected': {
        color: theme.palette.text.primary,
        '& .MuiTab-iconWrapper img': {
            filter: 'brightness(0) saturate(100%) invert(83%) sepia(40%) saturate(1593%) hue-rotate(101deg) brightness(97%) contrast(94%)'
        }
    },
    '&:not(:last-of-type)': {
        marginRight: 0
    },
    '& .MuiTab-iconWrapper': {
        marginRight: '2px',
        marginBottom: 0,
        '& img': {
            filter: 'brightness(0) saturate(100%) invert(42%) sepia(9%) saturate(498%) hue-rotate(167deg) brightness(94%) contrast(89%)'
        }
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

const CasinoPage = () => {
    const pathname = usePathname();
    const { t } = useTranslate();

    // Find tab index from URL path
    const tabIndex = tabs.findIndex((tab) => tab.value === pathname.replace('/casino/', ''));

    // Ensure initial index is valid (0 if not found)
    const initialTabIndex = tabIndex === -1 ? 0 : tabIndex;

    const [value, setValue] = React.useState<number>(initialTabIndex);

    useEffect(() => {
        setValue(initialTabIndex);
    }, [initialTabIndex]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ py: 3 }}>
            <Banner />

            <StyledTabs value={value} onChange={handleChange}>
                {tabs.map((item, index) => (
                    <StyledTab key={index} label={t(`${item.label}`)} icon={item.icon} iconPosition="start" />
                ))}
            </StyledTabs>

            <TabPanel value={value} index={0}>
                <Lobby />
            </TabPanel>

            {swiperArray.map((category, index) => {
                return category.key === 'SLOT' || category.key === 'HOT_GAME' ? (
                    <TabPanel key={category.key} value={value} index={index + 1}>
                        <Slots gameType={category.key} />
                    </TabPanel>
                ) : (
                    <TabPanel key={category.key} value={value} index={index + 1}>
                        <Casino gameType={category.key} />
                    </TabPanel>
                );
            })}
        </Box>
    );
};

export default CasinoPage;

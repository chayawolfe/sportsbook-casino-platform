import React, { useRef, useState, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    Stack,
    Skeleton,
    styled,
    Paper,
    Chip,
    Tab,
    Tabs,
    TextField,
    InputAdornment,
    Grid,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import { tabs } from 'data';
import { SUGGESTED } from 'config';
import { useTranslate } from 'locales';
import { getGamesBySearch } from 'api';
import EmptyData from 'components/empty-data';
import GameCard from 'components/game-card';
import { useSettingsContext } from 'components/settings';
import { ASSETS } from 'utils/axios';

interface ExploreModalProps {
    open: boolean;
    onClose: () => void;
}

interface IGameList {
    ownImg: string;
    gameName: string;
    gameCode: string;
    game_code: string;
    game_type: string;
    image_url: string;
    game_name: string;
    gameType: string;
}

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

export default function SearchDialog() {
    const { t } = useTranslate();
    const { modal, onToggleModal } = useSettingsContext();

    const [value, setValue] = useState(0);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [gameList, setGameList] = useState<IGameList[]>([]);

    const getGameLists = async () => {
        try {
            setLoading(true);
            const response = await getGamesBySearch(search, tabs[value].value, 1, 100);
            setGameList(response.data);
        } catch (error: any) {
            console.log('Getting Game List Error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getHistory = localStorage.getItem('search-history');
        setHistory(JSON.parse(getHistory || '[]'));
        getGameLists();
    }, []);

    useEffect(() => {
        if (search.length > 2 || search.length === 0) {
            getGameLists();
        }
    }, [search]);

    useEffect(() => {
        getGameLists();
    }, [value]);

    const containerRef = useRef<any>(null);

    const handleFocus = () => {
        if (search.length < 3) setHistoryOpen(true);
    };

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setHistoryOpen(false);
            }
        }

        if (historyOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [historyOpen]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChange = (value: string) => {
        if (value.length > 2) {
            setHistoryOpen(false);
            setHistory((prevHistory) => {
                const filtered = prevHistory.filter((item) => item !== value);
                const newHistory = [...filtered, value];
                if (newHistory.length > 10) {
                    newHistory.shift();
                }
                return newHistory;
            });
        } else {
            setHistoryOpen(true);
        }
        setSearch(value);
    };

    useEffect(() => {
        localStorage.setItem('search-history', JSON.stringify(history));
    }, [history]);

    const handleDeleteHistory = (item: any) => {
        setHistory(history.filter((h) => h !== item));
    };

    const handleClearHistory = () => setHistory([]);

    const handleClose = () => {
        setSearch('');
        onToggleModal('');
    };

    return (
        <Dialog
            fullScreen
            open={modal === 'EXPLORE'}
            onClose={handleClose}
            sx={{
                '& .MuiDialogContent-root': {
                    overflow: 'visible'
                }
            }}
        >
            <DialogContent
                sx={{
                    width: '100%',
                    p: 3,
                    maxWidth: 'lg',
                    alignSelf: 'center',
                    pt: 2
                }}
            >
                <Stack direction="column" gap={1} sx={{ position: 'relative', maxWidth: '100%' }} ref={containerRef}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6">{t('explore')}</Typography>
                        <Button sx={{ minWidth: 'auto', p: 0.5, bgcolor: 'background.layer5' }} onClick={handleClose}>
                            <CloseIcon />
                        </Button>
                    </Stack>

                    <TextField
                        fullWidth
                        placeholder="Search games"
                        value={search}
                        onFocus={handleFocus}
                        onChange={(e) => handleChange(e.target.value)}
                        sx={{
                            mb: 1.5,
                            '& .MuiOutlinedInput-root': { borderRadius: 3 },
                            '& .MuiOutlinedInput-input': { color: 'text.primary' }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            )
                        }}
                    />

                    <StyledTabs value={value} onChange={handleTabChange}>
                        {tabs.map((item, index) => (
                            <StyledTab key={index} label={t(`${item.label}`)} icon={item.icon} iconPosition="start" />
                        ))}
                    </StyledTabs>
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            display: gameList.length > 0 || loading ? 'grid' : 'flex',
                            gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(5, 1fr)', md: 'repeat(8, 1fr)' }
                        }}
                    >
                        {loading ? (
                            new Array(40).fill(null).map((_, index: number) => (
                                <Skeleton
                                    key={index}
                                    width="100%"
                                    height="162px"
                                    sx={{
                                        bgcolor: 'background.button1'
                                    }}
                                />
                            ))
                        ) : gameList.length > 0 ? (
                            gameList.map((item, index: number) => (
                                <Stack onClick={handleClose} key={`games-${index}`}>
                                    {item.gameType && item.gameType === 'SLOT' ? (
                                        <GameCard
                                            key={index}
                                            image={ASSETS(item.ownImg ? item.ownImg : `${item.gameCode}.webp`)}
                                            name={item.gameName}
                                            href={`/ag-game/${item.gameCode}`}
                                        />
                                    ) : (
                                        <GameCard
                                            image={item.ownImg ? ASSETS(item.ownImg) : item.image_url}
                                            name={item.game_name}
                                            href={`/game/${item.game_code}`}
                                        />
                                    )}
                                </Stack>
                            ))
                        ) : (
                            <Stack sx={{ width: 1, height: 1 }}>
                                <EmptyData />
                            </Stack>
                        )}
                    </Grid>

                    {historyOpen && (
                        <Paper
                            elevation={8}
                            sx={{
                                position: 'absolute',
                                top: 110,
                                left: 0,
                                width: '100%',
                                bgcolor: 'background.default',
                                borderRadius: 3,
                                zIndex: 10,
                                p: 2,
                                boxShadow: 8
                            }}
                        >
                            <Typography variant="h6" color="text.secondary" sx={{ mb: 1, textAlign: 'center' }}>
                                Search requires at least 3 characters.
                            </Typography>

                            {history.length > 0 && (
                                <>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{ mb: 1 }}
                                    >
                                        <Typography variant="subtitle2" color="text.secondary">
                                            History
                                        </Typography>
                                        <Button size="small" color="primary" onClick={handleClearHistory}>
                                            Clear search ({history.length})
                                        </Button>
                                    </Stack>
                                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                                        {history.map((item) => (
                                            <Stack
                                                onClick={() => {
                                                    setSearch(item);
                                                    setHistoryOpen(false);
                                                }}
                                            >
                                                <Chip
                                                    key={`history-${item}`}
                                                    label={item}
                                                    onDelete={() => handleDeleteHistory(item)}
                                                    sx={{
                                                        cursor: 'pointer',
                                                        fontSize: '0.75rem',
                                                        borderRadius: '0.375rem',
                                                        height: 'auto',
                                                        bgcolor: 'background.layer5',
                                                        color: 'text.secondary'
                                                    }}
                                                />
                                            </Stack>
                                        ))}
                                    </Stack>
                                </>
                            )}

                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                Suggested
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                {SUGGESTED.map((item) => (
                                    <Chip
                                        key={`suggest-${item}`}
                                        label={item}
                                        sx={{
                                            fontSize: '0.75rem',
                                            borderRadius: '0.375rem',
                                            height: 'auto',
                                            bgcolor: 'background.layer5',
                                            color: 'text.secondary'
                                        }}
                                        onClick={() => {
                                            setSearch(item);
                                            setHistoryOpen(false);
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Paper>
                    )}
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

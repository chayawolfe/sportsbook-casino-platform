import {
    Box,
    FormControl,
    InputBase,
    InputLabel,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    Typography
} from '@mui/material';
// mui icon
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { SortSelect } from 'components/sort-select';
import { useTranslate } from 'locales';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { useEffect, useState } from 'react';
import { ICryptoCurrency } from 'types/user';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const VISIBLE_COUNT = 6;

interface ICurrency {
    id: number;
    code: string;
    name: string;
    logo_url: string;
}

interface ISelectNetwork {
    networks: string[];
    cryptoCurrencies: {
        [key: string]: ICryptoCurrency[];
    };
    selectedValue: string;
    setSelectedValue: (value: string) => void;
}

export const SelectNetwork = ({ networks, cryptoCurrencies, selectedValue, setSelectedValue }: ISelectNetwork) => {
    const { t } = useTranslate();
    const [selectedNetwork, setSelectedNetwork] = useState<string>(networks[0] || '');
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [currencies, setCurrencies] = useState<ICurrency[]>([]);
    const [providerSearch, setProviderSearch] = useState<string>('');

    useEffect(() => {
        if (selectedNetwork !== '' && Object.keys(cryptoCurrencies).length > 0) {
            setCurrencies(cryptoCurrencies[selectedNetwork] || []);
        }
    }, [selectedNetwork]);

    const filteredCurrencies =
        currencies.length > 0
            ? currencies.filter((item: any) => item?.name?.toLowerCase().includes(providerSearch.toLowerCase()))
            : [];

    const selectedItem = currencies.find((item: any) => item.code === selectedValue) || currencies[0];

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setIsOpen((prev) => !prev);
        setAnchorEl(event.currentTarget);
    };

    const handleSelect = (code: string) => {
        setSelectedValue(code);
        handleClose();
    };

    const handleClose = () => {
        setAnchorEl(null);
        setIsOpen((prev) => !prev);
        setProviderSearch('');
    };

    const Row = ({ index, style }: ListChildComponentProps) => {
        const item = filteredCurrencies[index];
        return (
            <MenuItem
                key={item.id}
                selected={item.code === selectedValue}
                onClick={() => handleSelect(item.code)}
                style={style}
            >
                <Stack flexDirection="row" alignItems="center" gap={1}>
                    <Box
                        component="img"
                        src={`http://nowpayments.io${item.logo_url}`}
                        alt={item.code}
                        sx={{ width: 20, height: 20 }}
                    />
                    <ListItemText primary={item.name} />
                </Stack>
            </MenuItem>
        );
    };
    return (
        <Stack justifyContent="center" alignItems="center" gap={2} sx={{ flexDirection: { md: 'row', xs: 'column' } }}>
            <Stack width={1}>
                <InputLabel>{t('select_network')}</InputLabel>
                <SortSelect
                    value={selectedNetwork}
                    sortList={networks}
                    width={1}
                    capitalize
                    setSelectedValue={setSelectedNetwork}
                />
            </Stack>
            <Stack width={1}>
                <InputLabel>{t('select_currency')}</InputLabel>
                <FormControl sx={{ width: 1 }}>
                    <Box
                        onClick={handleOpen}
                        sx={{
                            border: '1px solid',
                            borderColor: 'background.border',
                            borderRadius: 3,
                            px: 2,
                            py: 1,
                            bgcolor: 'background.default',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            outline: 'none',
                            '&:hover': {
                                borderColor: 'text.primary'
                            },
                            ...(isOpen && {
                                border: '2px solid',
                                borderColor: 'primary.main'
                            })
                        }}
                    >
                        {selectedItem ? (
                            <Stack direction="row" alignItems="center" gap={1} maxWidth={0.9}>
                                <Box
                                    component="img"
                                    src={`http://nowpayments.io${selectedItem.logo_url}`}
                                    alt={selectedItem.code}
                                    sx={{ width: 20, height: 20 }}
                                />
                                <Typography noWrap fontWeight={700} variant="caption">
                                    {selectedItem.name}
                                </Typography>
                            </Stack>
                        ) : (
                            <Typography color="text.secondary">{t('currency')}</Typography>
                        )}

                        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * (VISIBLE_COUNT + 2) + ITEM_PADDING_TOP,
                                width: anchorEl ? anchorEl.offsetWidth : undefined
                            }
                        }}
                    >
                        <Box sx={{ px: 1, pt: 1, pb: 1 }}>
                            <InputBase
                                placeholder="Search Providers"
                                fullWidth
                                value={providerSearch}
                                onChange={(e) => setProviderSearch(e.target.value)}
                                sx={{
                                    bgcolor: 'background.layer4',
                                    borderRadius: 1,
                                    px: 1,
                                    fontSize: 14,
                                    height: 36,
                                    mb: 1
                                }}
                            />
                        </Box>
                        {filteredCurrencies.length > 0 ? (
                            <FixedSizeList
                                height={Math.min(VISIBLE_COUNT, filteredCurrencies.length) * ITEM_HEIGHT}
                                width="100%"
                                style={{ overflowX: 'hidden' }}
                                itemSize={ITEM_HEIGHT}
                                itemCount={filteredCurrencies.length}
                                overscanCount={6}
                            >
                                {Row}
                            </FixedSizeList>
                        ) : (
                            <MenuItem disabled>{t('no_results_found')}</MenuItem>
                        )}
                    </Menu>
                </FormControl>
            </Stack>
        </Stack>
    );
};

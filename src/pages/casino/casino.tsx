import { useEffect, useState, useMemo } from 'react';
import { Grid, Skeleton, Stack } from '@mui/material';
import { _games } from '_mock';
import GameCard from 'components/game-card';
import { MultiSelect } from 'components/multi-select';
import Pagination from 'components/pagination';
import { SortSelect } from 'components/sort-select';
import { providerType } from 'types/game';
import { getProviderGameList, getProviderList } from 'api';
import { ASSETS } from 'utils/axios';

const sortList = ['Popular', 'A-Z', 'Z-A', 'New'];

const Casino = ({ gameType }: { gameType: string }) => {
    const [provider, setProvider] = useState(['All']);
    const [providerList, setProviderList] = useState<providerType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [loading, setLoading] = useState(false);
    const [games, setGames] = useState<any>([]);
    const [selectedSort, setSelectedSort] = useState(sortList[0]);

    const selectList = useMemo(() => {
        return providerList.map((item) => ({ value: `${item.product_id}`, label: item.product_title }));
    }, [providerList]);

    const getProviders = async () => {
        try {
            // setLoading(true);
            const response = await getProviderList(gameType);
            setProviderList(response);
        } catch (error) {
            console.log(error);
        } finally {
            // setLoading(false);
        }
    };

    const getGameList = async () => {
        try {
            setLoading(true);
            if (provider) {
                const processed = provider.length === 1 && provider[0] === 'All' ? [] : provider.map(Number);

                console.log({
                    gameType: gameType,
                    currentPage: currentPage,
                    perPage: 40,
                    productIds: processed
                });
                const response = await getProviderGameList({
                    gameType: gameType,
                    currentPage: currentPage,
                    perPage: 40,
                    productIds: processed
                });

                setGames(response.data);
                setTotalPages(Math.ceil(response.count / 40));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleProvider = (values: string[]) => {
        setProvider(values);
        setCurrentPage(1);
    };

    useEffect(() => {
        getGameList();
    }, [provider, currentPage]);

    useEffect(() => {
        getProviders();
    }, []);

    return (
        <Stack direction="column" spacing={1}>
            <Stack flexDirection="row" gap={2} mt={2} alignItems="center">
                <SortSelect
                    size="small"
                    value={selectedSort}
                    sortList={sortList}
                    width={300}
                    setSelectedValue={setSelectedSort}
                />
                <MultiSelect
                    size="small"
                    placeholder="Providers"
                    selectedValues={provider}
                    selectValues={handleProvider}
                    list={selectList}
                />
            </Stack>
            <Grid
                container
                spacing={1}
                sx={{
                    display: games.length > 0 || loading ? 'grid' : 'flex',
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
                ) : games.length > 0 ? (
                    games.map((item: any, index: number) => (
                        <GameCard
                            key={index}
                            image={item.ownImg ? ASSETS(item.ownImg) : item.image_url}
                            name={item.game_name}
                            href={`/game/${item.game_code}`}
                        />
                    ))
                ) : (
                    <Stack
                        sx={{
                            py: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 1
                        }}
                    >
                        No Items
                    </Stack>
                )}
            </Grid>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </Stack>
    );
};

export default Casino;

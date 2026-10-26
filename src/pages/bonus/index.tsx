import { useEffect, useState } from 'react';
import { Stack, Typography, Grid } from '@mui/material';
import { getBonusList } from 'api';
import { LoadingScreen } from 'components/loading-screen';
import EmptyData from 'components/empty-data';
import BonusItem from './bonus-item';
import { IBonusData } from 'types/bonus';

export default function BonusPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [bonusList, setBonusList] = useState<IBonusData[]>([]);

    const getBonuses = async () => {
        try {
            setLoading(true);
            const response = await getBonusList();
            setBonusList(response);
        } catch (error: any) {
            console.log('get Bonus List Error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBonuses();
    }, []);
    return (
        <>
            <Stack mb={4}>
                <Typography variant="h4">Bonus</Typography>
            </Stack>
            {loading ? (
                <Stack width={1} minHeight="90vh">
                    <LoadingScreen />
                </Stack>
            ) : bonusList.length === 0 ? (
                <EmptyData />
            ) : (
                <Grid container spacing={1}>
                    {bonusList.map((item, index) => (
                        <BonusItem key={index} detail={item} />
                    ))}
                </Grid>
            )}
        </>
    );
}

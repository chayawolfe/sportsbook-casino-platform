import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box, Button, Grid } from '@mui/material';
import { ASSETS } from 'utils/axios';
import { fDate } from 'utils/format-time';
import { IBonusData } from 'types/bonus';

interface IBonusItem {
    detail: IBonusData;
}

export default function BonusItem({ detail }: IBonusItem) {
    const navigate = useNavigate();
    return (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ maxWidth: 400, bgcolor: 'background.layer3', color: '#fff', borderRadius: 2 }}>
                <CardMedia
                    component="img"
                    height="160"
                    image={ASSETS(detail.banner)}
                    alt="Bonus Image"
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 2, px: 1 }}
                >
                    <Box>
                        <Typography variant="body2" fontWeight={700}>
                            {detail.name}
                        </Typography>
                        <Typography variant="body2" color="primary">
                            Ends {fDate(detail.expireDate)}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            fontWeight: 700,
                            textTransform: 'none',
                            boxShadow: 'none',
                            minWidth: 110,
                            ml: 2
                        }}
                        onClick={() => navigate(`${detail._id}`)}
                    >
                        In progress
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    );
}

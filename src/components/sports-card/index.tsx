import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Image from 'components/image';

interface TeamInfo {
    name: string;
    iconUrl: string;
}

interface SportsCardProps {
    league: string;
    sport: string;
    isLive: boolean;
    homeTeam: TeamInfo;
    awayTeam: TeamInfo;
    homeScore: number;
    awayScore: number;
    matchStatus: string;
    odds: {
        home: number;
        draw: number;
        away: number;
        additional: number;
    };
}

const DotComponent = styled(Box)(({ theme }) => ({
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: theme.palette.text.primary
}));

const LiveBadge = styled(Box)(({ theme }) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    padding: '0 6px',
    right: theme.spacing(1),
    top: theme.spacing(1),
    background: 'rgba(49, 238, 136, 0.1)',
    color: theme.palette.success.main,
    fontSize: '14px',
    fontWeight: 600
}));

const TeamContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '33%'
});

const TeamIcon = styled(Box)({
    height: '48px',
    width: '48px',
    '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    }
});

const OddsButton = styled(Paper)(({ theme }) => ({
    display: 'flex',
    height: '40px',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    backgroundColor: theme.palette.background.layer5,
    '&.error-background': {
        background: 'rgba(252, 60, 60, 0.15)'
    }
}));

const SportsCard: React.FC<SportsCardProps> = ({
    league,
    sport,
    isLive,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    matchStatus,
    odds
}) => {
    return (
        <Card
            sx={{
                height: '100%',
                cursor: 'pointer',
                bgcolor: 'background.layer2',
                position: 'relative',
                px: '12px',
                py: '10px'
            }}
        >
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', fontSize: '14px', fontWeight: 600 }}>
                <Typography variant="inherit" component="span">
                    {sport}
                </Typography>
                <DotComponent />
                <Typography variant="inherit" component="span">
                    {league}
                </Typography>
            </Box>

            {isLive && (
                <LiveBadge>
                    <PlayArrowIcon sx={{ fontSize: 15 }} />
                    <Typography variant="inherit" sx={{ ml: '2px' }}>
                        Live
                    </Typography>
                </LiveBadge>
            )}

            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 2, height: '96px' }}>
                    <TeamContainer>
                        <TeamIcon>
                            <Image src={homeTeam.iconUrl} alt={homeTeam.name} />
                        </TeamIcon>
                        <Typography align="center" sx={{ mt: 0.7, fontSize: '14px', fontWeight: 600 }}>
                            {homeTeam.name}
                        </Typography>
                    </TeamContainer>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '33%' }}>
                        <Typography variant="h4" fontWeight="bold">
                            {homeScore}:{awayScore}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" color="text.secondary" sx={{ mt: 1 }}>
                            {matchStatus}
                        </Typography>
                    </Box>

                    <TeamContainer>
                        <TeamIcon>
                            <Image src={awayTeam.iconUrl} alt={awayTeam.name} />
                        </TeamIcon>
                        <Typography align="center" sx={{ mt: 0.7, fontSize: '14px', fontWeight: 600 }}>
                            {awayTeam.name}
                        </Typography>
                    </TeamContainer>
                </Grid>

                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <OddsButton className="error-background">
                        <Typography variant="inherit" component="span">
                            1
                        </Typography>
                        <Typography variant="inherit" component="span" color="error" sx={{ ml: 1 }}>
                            {odds.home}
                        </Typography>
                    </OddsButton>
                    <OddsButton className="error-background">
                        <Typography variant="inherit" component="span">
                            draw
                        </Typography>
                        <Typography variant="inherit" component="span" color="error" sx={{ ml: 1 }}>
                            {odds.draw}
                        </Typography>
                    </OddsButton>
                    <OddsButton className="error-background">
                        <Typography variant="inherit" component="span">
                            2
                        </Typography>
                        <Typography variant="inherit" component="span" color="error" sx={{ ml: 1 }}>
                            {odds.away}
                        </Typography>
                    </OddsButton>
                    <OddsButton>
                        <Typography variant="inherit" component="span">
                            +
                        </Typography>
                        <Typography variant="inherit" component="span" sx={{ ml: 0.5 }}>
                            {odds.additional}
                        </Typography>
                    </OddsButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SportsCard;

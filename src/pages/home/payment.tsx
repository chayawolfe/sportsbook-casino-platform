import { Box, Container, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const PaymentContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgb(23 26 26 / 70%)',
    [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(7)
    }
}));

const CoinContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
    padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
        gap: theme.spacing(2)
    },
    [theme.breakpoints.up('lg')]: {
        display: 'none'
    }
}));

const PaymentCard = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '96px',
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgb(23 26 26 / 70%)',
    padding: theme.spacing(0, 8)
}));

const BlurBackground = styled(Box)({
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    filter: 'blur(8px)',
    pointerEvents: 'none'
});

const DotImage = styled('img')({
    position: 'absolute'
});

const PaymentContent = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
        flexDirection: 'row-reverse'
    }
}));

const LargeCoinContainer = styled(Box)(({ theme }) => ({
    display: 'none',
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
        display: 'flex'
    }
}));

const PaymentMethods = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2),
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
        gap: theme.spacing(6)
    }
}));

const BonusContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(11),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
        marginTop: 0
    }
}));

const Payment = () => {
    const theme = useTheme();

    const blurBackground = [
        {
            top: '-12px',
            left: '16px',
            transform: 'scale(2)'
        },
        {
            top: '56px',
            left: '96px',
            transform: 'scale(2)'
        },
        {
            top: '-8px',
            left: '160px',
            transform: 'scale(2)'
        },
        {
            top: '-12px',
            left: '288px',
            transform: 'scale(3)'
        },
        {
            top: '60px',
            left: '320px',
            transform: 'scale(1.5)'
        },
        {
            bottom: '-12px',
            right: '16px',
            transform: 'scale(2)'
        },
        {
            bottom: '56px',
            right: '96px',
            transform: 'scale(1.5)'
        },
        {
            bottom: '-8px',
            right: '160px',
            transform: 'scale(2)'
        },
        {
            bottom: '-12px',
            right: '288px',
            transform: 'scale(3)'
        },
        {
            bottom: '60px',
            right: '320px',
            transform: 'scale(1.5)'
        }
    ];

    return (
        <PaymentContainer>
            <CoinContainer>
                {['BTC', 'ETH', 'BNB', 'XRP', 'USDT', 'USDC', 'SOL', 'ADA', 'DOGE', 'POL', 'TRX'].map((coin) => (
                    <img
                        key={coin}
                        src={`/assets/images/payment/${coin}.webp`}
                        alt={coin}
                        width={24}
                        height="auto"
                        style={{ marginLeft: '-0.25rem' }}
                    />
                ))}
            </CoinContainer>

            <PaymentCard>
                <BlurBackground>
                    {blurBackground.map((item, index) => (
                        <DotImage key={index} src="/assets/dot-C8z5Aoh_.webp" style={item} />
                    ))}
                </BlurBackground>

                <PaymentContent>
                    <LargeCoinContainer>
                        {['BTC', 'ETH', 'BNB', 'XRP', 'USDT', 'USDC', 'SOL', 'ADA', 'DOGE', 'POL', 'TRX'].map(
                            (coin) => (
                                <img
                                    key={coin}
                                    src={`/assets/images/payment/${coin}.webp`}
                                    alt={coin}
                                    width={24}
                                    height="auto"
                                    style={{ marginLeft: '-0.25rem' }}
                                />
                            )
                        )}
                    </LargeCoinContainer>

                    <PaymentMethods>
                        <img src="/assets/images/payment/apple_pay-DhGEreIw.webp" alt="Apple Pay" width={56} />
                        <img src="/assets/images/payment/mastercard-CVVg_XRh.webp" alt="Mastercard" width={28} />
                        <img src="/assets/images/payment/visa-CHvdFeKw.webp" alt="Visa" width={44} />
                        <img src="/assets/images/payment/google_pay-FVJ2d1pF.webp" alt="Google Pay" width={48} />
                        <img src="/assets/images/payment/pic_pay-fE-XPIEr.webp" alt="Pic Pay" width={60} />
                    </PaymentMethods>

                    <BonusContainer>
                        <Typography
                            sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' }, fontWeight: 'bold', lineHeight: '2rem' }}
                        >
                            <Typography variant="inherit" component="span" color="primary">
                                300%
                            </Typography>{' '}
                            Deposit Bonus
                        </Typography>
                    </BonusContainer>
                </PaymentContent>
            </PaymentCard>
        </PaymentContainer>
    );
};

export default Payment;

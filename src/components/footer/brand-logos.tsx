import { Box, useTheme } from '@mui/material';

const BrandLogos = () => {
    const theme = useTheme();

    const logos =
        theme.palette.mode === 'dark'
            ? [
                  { src: '/assets/images/brand-logo/d-92-DCx7K2V3.webp', alt: 'Brand 1' },
                  { src: '/assets/images/brand-logo/d-93-0pkDEp9Z.webp', alt: 'Brand 2' },
                  { src: '/assets/images/brand-logo/d-94-BjjhhHHh.webp', alt: 'Brand 3' },
                  { src: '/assets/images/brand-logo/d-95-CMQSGT4N.png', alt: 'Brand 4' },
                  { src: '/assets/images/brand-logo/d-96-pZM7QuMr.webp', alt: 'Brand 5' },
                  { src: '/assets/images/brand-logo/d-97-qal8av7f.webp', alt: 'Brand 6' },
                  { src: '/assets/images/brand-logo/d-98-DA42CT6W.webp', alt: 'Brand 7' },
                  { src: '/assets/images/brand-logo/d-99-NFJF9gM_.webp', alt: 'Brand 8' }
              ]
            : [
                  { src: '/assets/images/brand-logo/l-92-D9CXX7n9.webp', alt: 'Brand 1' },
                  { src: '/assets/images/brand-logo/l-93-DgRQ3Lqa.webp', alt: 'Brand 2' },
                  { src: '/assets/images/brand-logo/l-94-CFwrRsGr.webp', alt: 'Brand 3' },
                  { src: '/assets/images/brand-logo/l-95-DCnS_xIT.webp', alt: 'Brand 4' },
                  { src: '/assets/images/brand-logo/l-96-C1nvtIUl.webp', alt: 'Brand 5' },
                  { src: '/assets/images/brand-logo/l-97-CpWNpbFQ.webp', alt: 'Brand 6' },
                  { src: '/assets/images/brand-logo/l-98-DtiOQmq7.webp', alt: 'Brand 7' },
                  { src: '/assets/images/brand-logo/l-99-Do9OFKQ2.webp', alt: 'Brand 8' }
              ];

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                pb: 1,
                pt: { xs: 2, sm: 4 },
                borderTop: '1px solid',
                borderColor: 'divider'
            }}
        >
            {logos.map((logo, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: { xs: 1.5, sm: 3.5 },
                        width: { xs: '50%', sm: '12.5%' },
                        px: 0.75
                    }}
                >
                    <img src={logo.src} alt={logo.alt} style={{ width: '100%', height: 'auto' }} />
                </Box>
            ))}
        </Box>
    );
};

export default BrandLogos;

export const formatPlace = (place: number) => {
    if (place === 1) return <img src="/assets/gold-CfQ8SjyD.webp" alt="1st" width={20} />;
    if (place === 2) return <img src="/assets/silver-DTgn4-xw.webp" alt="2nd" width={20} />;
    if (place === 3) return <img src="/assets/copper-DgadfozE.webp" alt="3rd" width={20} />;
    return `${place}th`;
};

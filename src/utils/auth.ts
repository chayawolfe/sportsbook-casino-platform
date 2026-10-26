// utils
import axios from './axios';

// ----------------------------------------------------------------------

// function jwtDecode(token: string) {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//         window
//             .atob(base64)
//             .split('')
//             .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
//             .join('')
//     );

//     return JSON.parse(jsonPayload);
// }

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
    if (!accessToken) {
        return false;
    }

    // const decoded = jwtDecode(accessToken);

    // const currentTime = Date.now() / 1000;

    // return decoded.exp > currentTime;
    return true;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
    // eslint-disable-next-line prefer-const
    let expiredTimer;

    const currentTime = Date.now();

    // Test token expires after 10s
    // const timeLeft = currentTime + 10000 - currentTime; // ~10s
    const timeLeft = exp * 1000 - currentTime;

    clearTimeout(expiredTimer);

    expiredTimer = setTimeout(() => {
        alert('Token expired');

        localStorage.removeItem('betthrob-accessToken');

        window.location.href = '/';
    }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (accessToken: string | null) => {
    if (accessToken) {
        localStorage.setItem('betthrob-accessToken', accessToken);

        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // This function below will handle when token is expired
        // const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
        // tokenExpired(exp);
    } else {
        localStorage.removeItem('betthrob-accessToken');

        delete axios.defaults.headers.common.Authorization;
    }
};

export const getUniqueArray = (arr1: string[], arr2: string[]): string[] => {
    // Combine both arrays into one using the spread operator
    const combinedArray = [...arr1, ...arr2];

    // Use Set to get unique values
    const uniqueArray = Array.from(new Set(combinedArray));

    return uniqueArray;
};

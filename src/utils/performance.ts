// Debounce function to limit function calls
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

// Throttle function to limit function calls
export const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    let lastResult: ReturnType<T>;

    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

// Memoize function results
export const memoize = <T extends (...args: any[]) => any>(func: T): T => {
    const cache = new Map();

    return ((...args: Parameters<T>) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = func(...args);
        cache.set(key, result);
        return result;
    }) as T;
};

// Preload images
export const preloadImages = (urls: string[]): void => {
    urls.forEach((url) => {
        const img = new Image();
        img.src = url;
    });
};

// Preconnect to origins
export const preconnectToOrigins = (origins: string[]): void => {
    origins.forEach((origin) => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = origin;
        document.head.appendChild(link);
    });
};

// Measure performance
export const measurePerformance = (label: string, callback: () => void): void => {
    if (process.env.NODE_ENV === 'development') {
        console.time(label);
        callback();
        console.timeEnd(label);
    } else {
        callback();
    }
};

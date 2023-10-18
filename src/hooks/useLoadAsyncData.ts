import {useState, useCallback, useRef} from 'react';

interface Cache<T> {
    [key: string]: {
        timestamp: number;
        data: T;
    };
}

function generateCacheKey(...args: any[]): string {
    return JSON.stringify(args);
}


// simple generalised function for handling loading async data along with optional caching (if ttl > 0)
export function useLoadAsyncData<T, A extends any[]>(
    dataLoader: (...args: A) => Promise<T>,
    ttl = 0,
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const cache = useRef<Cache<T>>({});

    const load = useCallback((...args: A) => {
        setError(null);
        const cacheKey = generateCacheKey(...args);

        if (ttl > 0 && cache.current?.[cacheKey] && (Date.now() - cache.current[cacheKey].timestamp < ttl)) {
            setData(cache.current[cacheKey].data);
            return;
        }

        setLoading(true);
        dataLoader(...args)
            .then((result) => {
                setData(result);
                if (ttl > 0) {
                    cache.current[cacheKey] = {timestamp: Date.now(), data: result};
                }
            })
            .catch((e: Error) => {
                setError(e);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [dataLoader, ttl, cache]);

    return {
        data,
        loading,
        error,
        load,
    };
}

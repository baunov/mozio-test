import {useEffect, useState} from "react";
import {searchDestinations} from "@/fake-api/fake-api.ts";
import {useDebouncedValue} from "@/hooks/useDebouncedValue.ts";
import {useLoadAsyncData} from "@/hooks/useLoadAsyncData.ts";

const TTL = 60 * 1000; // 60 seconds

export function useDestinationsSearch(debounceTime = 0) {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebouncedValue(search, debounceTime);
    const {data, loading, error, load} = useLoadAsyncData(searchDestinations, TTL);

    useEffect(() => {
        if (debouncedSearch.length) {
            load(debouncedSearch);
        }
    }, [debouncedSearch, load]);

    return {
        loading,
        data,
        error,
        search,
        setSearch,
    };
}

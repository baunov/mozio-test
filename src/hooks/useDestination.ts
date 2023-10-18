import {getDestinationById} from "@/fake-api/fake-api.ts";
import {useLoadAsyncData} from "@/hooks/useLoadAsyncData.ts";
import {useEffect} from "react";

const TTL = 60 * 60 * 1000; // 1 hour
export function useDestination(id: number) {
    const {data, loading, error, load} = useLoadAsyncData(getDestinationById, TTL);

    useEffect(() => {
        load(id);
    }, [id, load]);

    return {
        data,
        loading,
        error
    };
}

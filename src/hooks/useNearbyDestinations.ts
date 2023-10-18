import {useEffect} from "react";
import {getNearbyDestinations} from "@/fake-api/fake-api.ts";
import {useLoadAsyncData} from "@/hooks/useLoadAsyncData.ts";

const TTL = 60 * 60 * 1000; // 1 hour
export function useNearbyDestinations(id: number) {
    const {data, loading, error, load} = useLoadAsyncData(getNearbyDestinations, TTL);

    useEffect(() => {
        load(id);
    }, [id, load]);


    return {
        data,
        loading,
        error
    };
}

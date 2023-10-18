import {Destination, DestinationSearchDto} from "../types/destination.ts";
import {FAKE_API_DATA} from "./fake-api-data.ts";
import {randomBetween, sortByDistance, wait} from "./utils.ts";

const SEARCH_DATA = FAKE_API_DATA
    .map(({id, name, country}) => ({id, name, country}));
export async function searchDestinations(search: string): Promise<DestinationSearchDto[]> {
    console.log('searchDestinations', {search});
    await wait(randomBetween(300, 600));

    if (search === 'fail') {
        throw new Error('Failed to fetch destinations');
    }

    const searchLower = search.toLowerCase();
    return SEARCH_DATA.filter((d) => {
        return d.name.toLowerCase().includes(searchLower)
            || d.country.toLowerCase().includes(searchLower);
    }).slice(0, 10);
}

export async function getDestinationById(id: number): Promise<Destination> {
    console.log('getDestinationById', {id});
    await wait(randomBetween(300, 600));
    const destination = FAKE_API_DATA.find((d) => d.id === id);
    if (!destination) {
        throw new Error('Destination does not exist');
    }
    return destination;
}

export async function getNearbyDestinations(id: number): Promise<Destination[]> {
    console.log('getNearbyDestinations', {id});
    await wait(randomBetween(1200, 1600));
    const destination = FAKE_API_DATA.find((d) => d.id === id);
    if (!destination) {
        return [];
    }
    const withoutCurrent = FAKE_API_DATA.filter((d) => d.id !== id);
    return sortByDistance(destination, withoutCurrent).slice(0, 5);
}

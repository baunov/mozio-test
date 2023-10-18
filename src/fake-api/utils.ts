import {haversineDistance} from "./haversine-distance.ts";
import {MapPoint} from "../types/map-point.ts";

export async function wait(time: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time)
    })
}

export function randomBetween(min: number, max: number): number {
    return min + Math.random() * (max - min);
}

export function sortByDistance<T extends MapPoint>(pt: T, pts: T[]): T[] {
    return [...pts].sort((a, b) => {
        return haversineDistance(pt, a) - haversineDistance(pt, b);
    });
}

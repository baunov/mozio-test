import {MapPoint} from "../types/map-point.ts";

const asin = Math.asin;
const cos = Math.cos;
const sin = Math.sin;
const sqrt = Math.sqrt;
const PI = Math.PI;

const earthRadius = 6371;

function squared(x: number) {
    return x * x;
}

function toRad(x: number) {
    return (x * PI) / 180.0;
}

function hav(x: number) {
    return squared(sin(x / 2));
}

export function haversineDistance(a: MapPoint, b: MapPoint): number {
    const aLat = toRad(a.latitude);
    const bLat = toRad(b.latitude);
    const aLng = toRad(a.longitude);
    const bLng = toRad(b.longitude);

    const ht = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLng - aLng);
    return 2 * earthRadius * asin(sqrt(ht));
}

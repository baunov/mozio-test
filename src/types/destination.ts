import {MapPoint} from "./map-point.ts";

export type Destination = {
    id: number;
    name: string;
    country: string;
    description: string;
    climate: string;
    currency: string;
} & MapPoint;

export type DestinationSearchDto = Pick<Destination, 'id' | 'name' | 'country'>;

import {useNearbyDestinations} from "@/hooks/useNearbyDestinations.ts";
import {useNavigate} from "react-router-dom";

type DestinationRecommendationsProps = {
    id: number
}
export function NearbyDestinations({id}: DestinationRecommendationsProps) {
    const {data, loading, error} = useNearbyDestinations(id);
    const navigate = useNavigate();

    if (error) {
        return <div className='flex w-full justify-center text-red-500'>
            Error fetching nearby destinations
        </div>
    }

    if (loading) {
        return <div className='flex gap-2 flex-wrap'>
            {new Array(5).fill(null).map((_, i) => {
                return <div key={i} className='rounded px-4 py-2 w-[150px] bg-purple-500 animate-pulse'>
                    <span className='whitespace-pre'> </span>
                </div>
            })}
        </div>
    }

    if (!data) {
        return <div>No nearby destinations found..</div>
    }

    return (
        <div className='flex gap-2 flex-wrap'>
            {
                data.map((d) => {
                    return <div key={d.id} onClick={() => navigate(`/${d.id}`)}
                                className='rounded bg-purple-500 text-white px-4 py-2 whitespace-nowrap cursor-pointer'>
                        {d.name}
                    </div>
                })
            }
        </div>
    )
}

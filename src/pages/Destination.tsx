import {useParams} from "react-router-dom";
import {useDestination} from "@/hooks/useDestination.ts";
import {useEffect} from "react";
import {toast} from "sonner";
import {NearbyDestinations} from "@/components/NearbyDestinations.tsx";

export function DestinationPage() {
    const { id } = useParams();
    const intId = parseInt(id!);
    const {loading, error, data} = useDestination(intId);


    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);

    if (!id) {
        return <></>
    }

    if (error) {
        return <div className='bg-slate-50 rounded-lg shadow-lg p-5 min-h-[300px]'>
            <div className='text-lg text-slate-500 flex w-full p-5 items-center justify-center'>Place not found</div>
        </div>
    }

    return (
        <div className='bg-slate-50 rounded-lg shadow-lg p-5 min-h-[300px]'>
            {loading ? (
                <div className='flex flex-col gap-4 mb-5'>
                    <div className='w-full animate-pulse bg-slate-200 h-[40px]'></div>
                    <div className='w-full animate-pulse bg-slate-200 h-[40px]'></div>
                    <div className='w-full animate-pulse bg-slate-200 h-[40px]'></div>
                    <div className='w-full animate-pulse bg-slate-200 h-[40px]'></div>
                </div>
            ) :
                (data &&
                    <>
                        <h1 className='text-xl mb-5'>{data.name}</h1>
                        <p className='mb-5'>{data.description}</p>
                        <div className='flex flex-col gap-2 mb-5'>
                            <div>
                                <span className='font-medium'>Country:</span> <span>{data.country}</span>
                            </div>
                            <div>
                                <span className='font-medium'>Climate:</span> <span>{data.climate}</span>
                            </div>
                            <div>
                                <span className='font-medium'>Currency:</span> <span>{data.currency}</span>
                            </div>
                        </div>
                    </>
                )
            }
            <div className='font-medium mb-2 text-lg'>
                Nearby Locations
            </div>
            <NearbyDestinations id={intId}/>
        </div>
    );
}

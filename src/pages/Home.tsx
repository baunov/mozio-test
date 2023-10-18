import {toast} from "sonner";
import {DestinationsAutocomplete} from "@/components/DestinationsAutocomplete.tsx";
import {useDestinationsSearch} from "@/hooks/useDestinationsSearch.ts";
import {useEffect, useRef} from "react";
import {useNavigate, useOutlet} from "react-router-dom";
import {DestinationSearchDto} from "@/types/destination.ts";

export function HomePage() {
    const navigate = useNavigate();
    const outlet = useOutlet();
    const {
        search,
        setSearch,
        data,
        loading,
        error
    } = useDestinationsSearch(200);
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);

    useEffect(() => {
        searchRef.current?.focus();
    }, []);

    const onDestinationSelected = (d: DestinationSearchDto) => {
        navigate(`/${d.id}`);
    };

    return (
        <div className={`
        flex flex-col w-screen min-h-screen
        bg-gradient-to-tr from-slate-100 to-purple-500 px-8
        pt-24
        transition-all items-center
        `}>
            <div className='w-full max-w-xl mb-5'>
                <DestinationsAutocomplete
                    ref={searchRef}
                    loading={loading}
                    options={data ?? []}
                    onSelectedChange={onDestinationSelected}
                    search={search}
                    onSearchChange={setSearch}
                />
            </div>

            <div className='max-w-xl w-full'>
                {outlet}
            </div>

        </div>
    )
}

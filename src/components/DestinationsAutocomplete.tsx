import {ForwardedRef, forwardRef, Fragment} from "react";
import {Combobox, Transition} from "@headlessui/react";
import {CheckIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {DestinationSearchDto} from "@/types/destination.ts";
import {LoadingSpinner} from "@/components/LoadingSpinner.tsx";

type DestinationsAutocompleteProps = {
    options: DestinationSearchDto[];
    search?: string;
    onSearchChange?: (search: string) => void;
    selected?: DestinationSearchDto;
    onSelectedChange?: (opt: DestinationSearchDto) => void;
    loading?: boolean;
}

export const DestinationsAutocomplete = forwardRef(function DestinationsAutocomplete({
                                             options,
                                             onSelectedChange,
                                             selected,
                                             search,
                                             onSearchChange,
                                             loading = false,
                                         }: DestinationsAutocompleteProps, ref: ForwardedRef<HTMLInputElement>) {

    const onSelect = (opt: DestinationSearchDto) => {
        onSelectedChange?.(opt);
        onSearchChange?.('');
    };

    return (
        <Combobox value={selected} onChange={onSelect}>
            <div className="relative mt-1">
                <div
                    className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-300 sm:text-sm
                    border focus-within:border-purple-100 border-transparent transition-all">
                    <Combobox.Input<DestinationSearchDto>
                        ref={ref}
                        autoComplete="off"
                        placeholder="Search places"
                        className="w-full border-none py-5 pl-5 pr-15 text-lg leading-5 text-slate-900 focus:ring-0 outline-none"
                        displayValue={(opt) => opt.name}
                        value={search}
                        onChange={(event) => onSearchChange?.(event.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-5">
                        <Combobox.Button>
                            <MagnifyingGlassIcon
                                className="h-6 w-6 text-slate-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                </div>

                {Boolean(search) && (
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => onSearchChange?.('')}
                >
                    <Combobox.Options
                        className="absolute flex flex-col mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {
                            loading && <div className='py-2 px-4 flex flex-row justify-center w-full'><LoadingSpinner/></div>
                        }
                        {options.length === 0 && search !== '' && !loading ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-slate-700">
                                Nothing found.
                            </div>
                        ) : (
                            !loading && options.map((opt) => (
                                <Combobox.Option
                                    key={opt.id}
                                    className={({active}) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-purple-600 text-white' : 'text-slate-900'
                                        }`
                                    }
                                    value={opt}
                                >
                                    {({selected, active}) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected ? 'font-medium' : 'font-normal'
                                                }`}
                                            >
                                              {opt.name}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                        active ? 'text-white' : 'text-purple-600'
                                                    }`}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
                )}
            </div>
        </Combobox>
    )
});

# mozio-test

Project uses the following libs on top of React:
 - tailwind
 - headlessui
 - react-router
 - sonner

## Some tech decisions

### Fake API

Endpoints:
 - searchDestinations: returns just the data that is required for autocomplete functionality. I assume that's how a real API would work as search index for performant real-time search functionality might be separated from the main database and might not contain all the entity fields
 - getDestinationById: returns the complete Destination entity by id
 - getNearbyDestinations: sorts Destinations by haversine distance and returns top 5 closest to the target destination. Returns complete Destination entities array. Although UI displays just the names, I decided that it's reasonable to assume that such endpoint if implemented in reality would also return the complete entities.

### UI/UX

I used Tailwind along with HeadlessUI (for autocomplete). Accessible, looks good. Enjoy working with Tailwind.

As for autocomplete - I made it behave more like a search so that the selected option is not really displayed once selected.
I think it's a better UX so that user doesn't have to erase previously searched item name before entering a new one.
Also, it would look weird if user navigates to a different Destination (e.g. using suggested nearest ones) - and the search would still display the old one.

For search I added 200ms debounce and 1 minute caching of results.

The destination page can also be opened independantly by entering a url domain/<destination_id>.

### Code

I decided to implement a custom hook `useLoadAsyncData` for generic async data fetching.
It handles major states (loading, error, data) and optionally adds caching (by defining ttl).
Then this hook is wrapped by app-specific hooks that fetch some piece of app data: useDestination, useDestinationsSearch, useNearbyDestinations

### Comments

Some components could've been split-up further. E.g. Autocomplete could've been done in a more generic way. Also, could've made a Card component as well as Tag (for NearbyDestinations display).
But I belive that the code that is already there should be sufficient for the purposes of the test task.







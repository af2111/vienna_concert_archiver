import { insertEvent } from "./database_handler.js";
import { get_events_arena, get_events_in_range_generic } from "./get_events_arena.js";
import { get_events_venster} from "./get_events_venster.js";



// get all events in venster99 from 2021 to 2024 and enter them in the database
get_events_in_range_generic(get_events_venster, 2021, 1, 2024,2).then((months) => {
    for (const month of months) {
        for(const gig of month) {
            insertEvent(gig);
        }
    }
});


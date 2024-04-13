import { URLSearchParams } from "url";
import { Standard_Event } from "./types/Standard_Event.js";

/*
this function fetches the Concert Data from Arena's API,
extracts the most important data for every event and
returns them all in an array of objects
*/
export async function get_events_arena(month: number, year: number): Promise<Array<Standard_Event>> {
    let clean_events: Array<Standard_Event> = [];
    //Define Parameters for fetch query (all non-date-related ones are irrelevant)
    const fetch_parameters = new URLSearchParams({
        searchTerm: "",
        day: "1",
        month: month.toString(),
        year: year.toString(),
        page: "0",
        pageSize: "10000",
        eventCategory: "-1",
        abonnement: "-1",
        cultureCode: "de-AT",
        locationId: "0"
    });
    const arena_response = await fetch("https://arena.wien/DesktopModules/WebAPI/API/Event/Search?" + fetch_parameters.toString());
    const arena_json = await arena_response.json();
    arena_json["concerts"].forEach(concert => {
        const clean_event: Standard_Event = {
            title: concert["Title"],
            LocationID: concert["LocationId"],
            BeginDate: new Date(concert["DateBegin"]),
            EndDate: new Date(concert["DateEnd"]),
            URL: concert["DetailUrl"]
        };
        clean_events.push(clean_event);
    });
    if(clean_events.length != 0) {
        console.log("Du hast die Arena genervt: " + clean_events[0].BeginDate)
    }
    return clean_events;
}

/*try to get events in a certain range
(i am sorry for the pain i will cause the next person to read this)
returns a 2dimensional array of arena_events, first dimension is months,
second dimension is events
event_function should be a function in the style of get_events_arena or get_venster_events
*/

export async function get_events_in_range_generic
(event_function: (month: number, year: number) => Promise<Array<Standard_Event>>, start_year: number, start_month: number, end_year: number, end_month: number)
: Promise<Array<Array<Standard_Event>>> {
    //if first input year is smaller than second input year, switch around the inputs
    if (start_year > end_year) {
        let temp_end = end_year;
        end_year = start_year; 
        start_year = temp_end;
        let temp_end_month = end_month;
        end_month = start_month;
        start_month = temp_end_month;
        console.log("Switched around years and months." )
    }
    const all_events: Array<Array<Standard_Event>> = [];
    //if search spans only one year, go through all months between start and end
    if(start_year == end_year) {
        console.log("Search spans only one year.")
        // do the switch if the months are in the wrong order
        if (start_month > end_month) {
            let temp_end_month = end_month;
            end_month = start_month;
            start_month = temp_end_month;
            console.log("Switched around months.")
        }
        //run through specified months of the year
        for(let same_year_i = start_month; same_year_i <= end_month; same_year_i += 1) {
            console.log("Now at month " + same_year_i + " of year " + start_year);
            all_events.push(await event_function(same_year_i, start_year));
        }
    /*
    if it spans multiple years, make one loop to run through the years
    and one nested loop to run through the months and get all the events
    */
    } else {
        for(let i = start_year; i <= end_year; i++) {
            //if its the start year you start at the start month, else you start at 1
            if(i == start_year) {
                for(let first_year_j = start_month; first_year_j <= 12; first_year_j++) {
                    all_events.push(await event_function(first_year_j, i));
                }
            //end at end month if its the last year
            } else if(i == end_year) {
                for(let last_year_j = 1; last_year_j <= end_month; last_year_j++) {
                    all_events.push(await event_function(last_year_j, i));
                }
            // regular loop (go through all months of the year)
            } else {
                for(let j = 1; j <= 12; j++) {
                    all_events.push(await event_function(j, i));
                }
            }
        }
    }
    return all_events;
}
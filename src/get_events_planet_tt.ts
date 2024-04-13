import { Standard_Event } from "./types/Standard_Event";





function get_location_from_color(color: String): number {
    if(color == "var(--e-global-color-1322bcf)") {
        return 2;
    } else if (color == "var(--e-global-color-0d47491)") {
        return 4;
    } else if (color == "var(--e-global-color-2c6c89d)") {
        return 3;
    } else {
        return 0;
    }
}

export async function get_events_ptt(month: number, year: number): Promise<Array<Standard_Event>> {
    let clean_events: Array<Standard_Event> = [];
    //Define Parameters for fetch query (all non-date-related ones are irrelevant)
    let start_string = "";
    let end_string = "";
    if(month < 10) {
        start_string = `${year.toString()}-0${month.toString()}-01`;
        end_string = `${year.toString()}-0${(month + 1).toString()}-01`
    } else if (month == 12) {
        start_string = `${year.toString()}-${month.toString()}-01`;
        end_string = `${(year + 1).toString()}-01-01`
    }
    
    

    const fetch_parameters = new URLSearchParams({
        action: "WP_FullCalendar",
        type: "event",
        start: start_string,
        end: end_string
    });
    const api_url = "https://planet.tt/wp-admin/admin-ajax.php?" + fetch_parameters.toString();
    console.log(api_url);
    const ptt_response = await fetch(api_url);
    const ptt_json = await ptt_response.json();
    console.log(ptt_response);
    ptt_json.forEach(concert => {
        //planet.tt returns url escaped with backslashes, this removes them
        const clean_url: String = concert["url"].replace(/\\/g, "");
        const clean_event: Standard_Event = {
            title: concert["title"],
            LocationID: get_location_from_color(concert["borderColor"]),
            BeginDate: new Date(concert["start"]),
            EndDate: new Date(concert["end"]),
            URL: clean_url
        };
        clean_events.push(clean_event);
    });
    if(clean_events.length != 0) {
        console.log("Du hast Planet.tt genervt: " + clean_events[0].BeginDate)
    }
    return clean_events;
}
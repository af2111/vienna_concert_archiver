import * as cheerio from "cheerio";
import { Standard_Event } from "./types/Arena_Event";



/*
This function gets all of the events from the venster99 events calendar
by scraping the site with cheerio and standardises the data in the 
basic format


*/
export async function get_events_venster(month: number, year: number): Promise<Array<Standard_Event>> {

    const res = await fetch("https://www.venster99.at/event-created/" + year.toString() + "-" + month.toString());
    const html_raw = await res.text();
    const $ = cheerio.load(html_raw);
    //Get every link to a gig
    const all_event_links = $("a.event-popup");
    //Get matching event calendar entry elements (for parsing the date quickly)
    const event_link_tds = all_event_links.parents("td.single-day");
    //go through all links and collect the necessary data
    //Edgecase: catch weird behavior if it ever comes up, 
    //lengths have to be equal for this to work because there has to be one identifiable parent
    //td for every event link 
    if(all_event_links.length == event_link_tds.length) {
        const clean_events: Array<Standard_Event> = [];
        /*this is a regular for loop because the parent td elements are used to 
        get information about the date of the gig*/
        for (let i = 0; i < all_event_links.length; i++) {
            const event_title = all_event_links[i].attribs["title"];
            const location_id = 1;
            const event_date = event_link_tds[i].attribs["data-date"];
            const url = "https://venster99.at" + all_event_links[i].attribs["href"];
            const clean_event: Standard_Event = {
                title: event_title,
                LocationID: location_id,
                BeginDate: new Date(event_date),
                EndDate: new Date(event_date),
                URL: url
            } 
            clean_events.push(clean_event);
        }
        if(clean_events.length != 0) {
            console.log("Du hast das Venster genervt: " + clean_events[0].BeginDate.toISOString())
        }
        return clean_events;
    } else {
        throw Error("Venster Website macht Faxen");
    }
}


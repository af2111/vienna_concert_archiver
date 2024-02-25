import sqlite from "sqlite3";
import { Standard_Event } from "./types/Arena_Event";
import { RunResult } from "sqlite3";
//connect to db
const db = new sqlite.Database("/home/af2111/Schreibtisch/Coding/Arena_Search_Tool/db/ARENA_EVENTS.db");


//takes Event and inserts it in DB
export function insertEvent(arena_event: Standard_Event) : void {
    const sql_string = "INSERT INTO events (title, LocationID, BeginDate, EndDate, URL) VALUES (?, ?, ?, ? ,?);";
    //define values for insertion
    const insert_values = [
        arena_event.title,
        arena_event.LocationID,
        arena_event.BeginDate.toISOString(),
        arena_event.EndDate.toISOString(),
        arena_event.URL
    ]
    //run the insert command + errorhandling
    db.run(sql_string, insert_values, (res: RunResult, err: Error) => {
        if(err != null) {
            throw Error("Database Insert failed: " + err.message);
        } else {
            console.log("Insert Successful, Title: " + insert_values[0])
        }
    });
}


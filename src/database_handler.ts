import { Standard_Event } from "./types/Standard_Event";
import { RunResult } from "sqlite3";
import { Database } from "sqlite";


//takes Event and inserts it in DB
export function insertEvent(db: Database, event: Standard_Event) : void {
    const sql_string = "INSERT INTO events (title, LocationID, BeginDate, EndDate, URL) VALUES (?, ?, ?, ? ,?);";
    //define values for insertion
    const insert_values = [
        event.title,
        event.LocationID,
        event.BeginDate.toISOString(),
        event.EndDate.toISOString(),
        event.URL
    ]
    //run the insert command + errorhandling
    db.run(sql_string, insert_values, (res: RunResult, err: Error) => {
        if(err) {
            throw Error("Database Insert failed: " + err.message);
        } else {
            console.log("Insert Successful, Title: " + insert_values[0])
        }
    });
};

//basic data retrieval from db

export async function getData(db: Database): Promise<Standard_Event[]> {
    const sql_string = "SELECT * FROM events;";
    return await db.all(sql_string);
}
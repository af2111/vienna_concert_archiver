import { getData, insertEvent } from "./database_handler.js";
import { db_path } from "./settings/settings.js";
import {open} from "sqlite";
import sqlite3 from "sqlite3";
import { split_bands_arena, split_bands_ptt, split_bands_venster } from "./util/split_names.js";

//open database
open({filename: db_path, driver: sqlite3.Database}).then(db => {
    //get all rows of events table
    getData(db).then((rows) => {
        //start splitting bandnames - every location has a different way of seperating bandnames, 
        //so we have to go through cases
        rows.forEach(row => {
            switch(row.LocationID) {
                case 1: 
                    console.log(split_bands_venster(row.title) + " @ Venster99")
                    break;
                case 2:
                    console.log(split_bands_ptt(row.title) + " @ Szene Wien");
                    break;
                case 3:
                    console.log(split_bands_ptt(row.title) + " @ Gasometer");
                    break;
                case 4:
                    console.log(split_bands_ptt(row.title) + " @ Simm City");
                    break;
                case 55:
                    console.log(split_bands_arena(row.title) + " @ Arena Große Halle");
                    break;
                case 56:
                    console.log(split_bands_arena(row.title) + " @ Arena Kleine Halle");
                    break;
                case 57:
                    console.log(split_bands_arena(row.title) + " @ Arena Dreiraum");
                    break;
            }
        });
    })
});

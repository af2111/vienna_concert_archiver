import { getData, insertBand, insertEvent } from "./database_handler.js";
import { db_path } from "./settings/settings.js";
import {open} from "sqlite";
import sqlite3 from "sqlite3";
import { get_arena_country_code, split_bands_arena, split_bands_ptt, split_bands_venster } from "./util/split_names.js";

//open database

open({filename: db_path, driver: sqlite3.Database}).then(db => {
    //get all rows of events table
    getData(db).then((rows) => {
        //start splitting bandnames - every location has a different way of seperating bandnames, 
        //so we have to go through cases
        console.log(get_arena_country_code(split_bands_arena(rows[2].title)[0]));
    
        rows.forEach(row => {
            switch(row.LocationID) {
                //venster
                case 1:
                    break;
                //planet.tt data    
                case 2:
                case 3:
                case 4:
                    break;
                //arena data    
                case 55:
                case 56:
                case 57:
                    split_bands_arena(row.title).forEach(band => {
                        console.log(get_arena_country_code(band));
                    }) 
                    break;
                }
            });
    });
    
});

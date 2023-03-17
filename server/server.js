//This is the minimal express server. 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('../server/db/db-connection.js'); 

const app = express();
const PORT = 8080;

// Configuring cors middleware
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// //creates an endpoint for the route `/`
app.get("/", (req, res) => {
    res.json("Hello Techtonica Server for an app with Events");
  });


app.get('/api/events', async (req, res) =>{

    //real connection with the DB eventonica
    try{
        const { rows: events } = await db.query('SELECT * FROM events');
        res.send(events);

    } catch(error){
        console.log(error);
        return res.status(400).json({error});

    }})


    app.post("/api/events", async (req, res) => {
        //TO - DO - At the end => save this event to the db
        //INSERT INTO events (title, location, eventtime) VALUES ('Women in Tech Techtonica Panel', 'Overland Park Convention Center', '2023-04-21')
        try {
            const newEvent = {
                title: req.body.title,
                location: req.body.location,
                eventtime: req.body.eventtime
            }
            const result = await db.query('INSERT INTO events(title, location, eventtime) VALUES ($1, $2, $3) RETURNING *', [newEvent.title, newEvent.location, newEvent.eventtime]);
            let response = result.rows[0];
            console.log(response);
            res.json(response)
    
        } catch (error){
            console.log(error);
            return res.status(400).json({error});
        }
    })
    


app.listen(PORT, () => console.log(`Hola! Server running on Port http://localhost:${PORT}`));
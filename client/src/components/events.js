import { useState, useEffect } from "react";
import EventCard from "./event";
import CardGroup from 'react-bootstrap/CardGroup';
import FormEvent from "./formevent";



function Events() {
    const [events, setEvents] = useState([]);
// fetch data from server & DB
    const getRequest = () => {
      fetch("http://localhost:8080/api/events")
      .then((response) => response.json())
      .then(events => {
        setEvents(events); 
        console.log('Events fetched...', events);
        });
    }
// add to data in sercer & DB
    useEffect(() => {getRequest()}, []);

    const postRequest = (newEvent) =>{
      //console.log("From the parent", newEvent);
      return fetch("http://localhost:8080/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log("From the front", data);
        setEvents((events) => [...events, data])
      })
    }
// delete event in data & server



    // add formEvent w/ terneray operator & button for user to hit 
    
  return (
    <div>
    <CardGroup className="Events">
            {events.map(event =>
            <EventCard key={event.id} title={event.title} location={event.location} time={event.eventtime}/>
            )}
    </CardGroup>
    <FormEvent postRequest={postRequest} />  
    </div>
  );
}

export default Events;
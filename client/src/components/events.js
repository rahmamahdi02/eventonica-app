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

const deleteEvent = async (id) => {
  try {
    const deleteEvent = await fetch(`http://localhost:8080/api/events/${id}`, {
    method: "DELETE"
    }); 
    setEvents(events.filter(event => event.id !== id))
  } catch (err){
    console.error(err.message);
  }
}

// edit event in DB

const putRequest = () => {
  fetch(`http://localhost:8080/api/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/JSON"
    },
    body: JSON.stringify(event)
  })
    .then(() => {
      props.getRequest();
    });
}

    // add formEvent w/ terneray operator & button for user to hit 
    
  return (
    <div>
          <FormEvent postRequest={postRequest} />  
<h2> Your Events</h2>
    <CardGroup className="Events">

    {events.map(event =>
            <EventCard key={event.id} id={event.id} title={event.title} location={event.location} time={event.eventtime} deleteEvent={deleteEvent}/>
            )}
    </CardGroup>
    </div>
  );
}

export default Events;
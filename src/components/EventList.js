import React from 'react';
import Event from "./Event"

// eventsArr = [{...},{...},{....}]
const EventList = (props) => {

return props.eventsArr.map((event) => {
    return <Event key={event.id} title={event.title} start={event.start} end={event.end} location={event.location} numAttending={event.numAttending}/>
    });

};


export default EventList;

import React from 'react';

const Event = (props) => {


    return <div>
      <br></br>
      <p><strong>Title: </strong>{props.title}</p>
      <p><strong>Start: </strong>{props.start}</p>
      <p><strong>End: </strong>{props.end}</p>
      <p><strong>Location: </strong>{props.location}</p>
      <p><strong>Attendees: </strong>{props.numAttending}</p>
    </div>

};


export default Event;

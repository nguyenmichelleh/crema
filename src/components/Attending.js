import React from 'react';

const Attending = (props) => {


    return <div>
      <br></br>
      <p><strong>Title: </strong>{props.title}</p>
      <p><strong>Start: </strong>{props.start}</p>
      <p><strong>End: </strong>{props.end}</p>
      <p><strong>Location: </strong>{props.location}</p>
    </div>

};


export default Attending;
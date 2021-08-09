import React from 'react';
import firebase from 'firebase';
import { useState } from 'react';
import Attending from "./Attending"

// eventsArr = [{...},{...},{....}]
const AttendingList = (props) => {

    // key should not be title but UID of event can be repeat user sooooo

    return props.eventsArr.map((event) => {
        console.log(event)
        return <Attending key={event.title} title={event.title} name={event.name} start={event.start} end={event.end} location={event.location}/>
        });

}


export default AttendingList;


// eventIDs.map(id => {
//     return dbRef.child('events').child(id).on('value', function(snapshot) {
//         console.log(snapshot.val());
//         const eventDetails = snapshot.val()
//     })
//     });
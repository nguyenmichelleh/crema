import React from 'react';
import { useState } from 'react';
import firebase from 'firebase';
import { UserContext, useUser, UserContextProvider} from "../context/userContext"
import EventList from "./EventList"
import AttendingList from "./AttendingList"

export default function Profile() {
    
    const [user] = useUser();
    const [myEvents, setMyEvents] = useState([])
    const [eventsAttending, setEventsAttending] = useState([])


    const viewMyCremaRuns = () => {

      const eventsArr = []

      const dbRef = firebase.database().ref();
      dbRef.child("events").get().then((snapshot) => {
  
          console.log(snapshot.val())
          const events = snapshot.val()
  
          for (const event in events) {
              const singleEvent = {}
              var eventDetails = events[event]

              // console.log(eventDetails.UID)
              // console.log(`CURRENT USER: ${user.UID}`)
  
              if (eventDetails.UID === user.UID) {
                singleEvent["id"] = event
                singleEvent["title"] = eventDetails.title
                singleEvent["start"] = eventDetails.start 
                singleEvent["location"] = "Nebraska"
                eventsArr.push(singleEvent)

                // singleEventArr.push(event, eventDetails.title, eventDetails.start)
                // eventsArr.push(singleEventArr)
              }
  
              // for (const i in eventDetails) {
              //     console.log(`${event} holds ${eventDetails[i]}`)
              // }
          }
  
          setMyEvents(eventsArr)
          
          for (const item in myEvents) {
            
            var myEventDetails = myEvents[item]
            console.log(myEventDetails.title)
            console.log(myEventDetails.start)
            // console.log(myEventDetails.title)
            // console.log(myEventDetails.start)
          }

          // console.log(`MY EVENTS: ${eventsArr}`)
      }
      )
    }

    const viewRunsAttending = () => {

      const dbRef = firebase.database().ref();

      dbRef.child('attendees').orderByChild(user.UID).equalTo(true).on("value", function(snapshot) {
        console.log(snapshot.val()); // object of objects, all {eventIDs: {userIDs..}}
        snapshot.forEach(function(data) {
            console.log(data.key); // all eventIDs
        });

        // setEventsAttending(Object.keys(snapshot.val())) // array of all eventIDs
      
      const eventsAttendingArr = []

      const eventIDs = Object.keys(snapshot.val()) // array of all eventIDs

      eventIDs.map(id => {
        return dbRef.child('events').child(id).on('value', function(snapshot) {
            console.log(snapshot.val());
            eventsAttendingArr.push(snapshot.val())
            setEventsAttending(eventsAttendingArr)
            console.log(eventsAttending)

        })

      });


    });


    }


    return (
        
        <div>
            <h3>MyCrema Profile</h3>
            <p>{user === null ? "Please log in to view profile." : `First Name: ${user.firstName}`}</p>
            <p>{user === null ? "Please log in to view profile." : `Last Name: ${user.lastName}`}</p>
            <p>{user === null ? "Please log in to view profile." : `Pronouns: ${user.pronouns}`}</p>
            <p>{user === null ? "Please log in to view profile." : `Favorite Drink: ${user.favDrink}`}</p>
            <p>{user === null ? "Please log in to view profile." : `Favorite Cafe: ${user.favCafe}`}</p>
            <p>{user === null ? "Please log in to view profile." : `Bio: ${user.bio}`}</p>
            <p>{user === null ? "Please log in to view profile." : `Unique ID: ${user.UID}`}</p>

            <button onClick={viewMyCremaRuns} >View My CremaRuns</button>
            <button onClick={viewRunsAttending} >View CremaRuns I'd Like to Attend</button>
            <h4>CremaRuns: Host</h4>
            <EventList eventsArr={myEvents}/>
            <br></br>
            <h4>CremaRuns: Attendee</h4>
            <AttendingList eventsArr ={eventsAttending}/>

            
        </div>
    
      );
    };
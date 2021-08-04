import React from 'react';
import { useState } from 'react';
import firebase from 'firebase';
import { UserContext, useUser, UserContextProvider} from "../context/userContext"
import EventList from "./EventList"

export default function Profile() {
    
    const [user] = useUser();
    const [myEvents, setMyEvents] = useState([])

    const generateEventString = () => {
      let output = ""
          
      for (const item in myEvents) {
        
        var myEventDetails = myEvents[item]
        output += `Title: ${myEventDetails.title} `
        output += `Start: ${myEventDetails.start} `
        // console.log(myEventDetails.title)
        // console.log(myEventDetails.start)
      }
      return output
    }

    const viewCremaRuns = () => {

      const eventsArr = []

      const dbRef = firebase.database().ref();
      dbRef.child("events").get().then((snapshot) => {
  
          console.log(snapshot.val())
          const events = snapshot.val()
  
          for (const event in events) {
              const singleEvent = {}
              const singleEventArr = []
              var eventDetails = events[event]

              // console.log(eventDetails.UID)
              // console.log(`CURRENT USER: ${user.UID}`)
  
              if (eventDetails.UID === user.UID) {
                singleEvent["id"] = event
                singleEvent["title"] = eventDetails.title
                singleEvent["start"] = eventDetails.start 
                eventsArr.push(singleEvent)

                // singleEventArr.push(event, eventDetails.title, eventDetails.start)
                // eventsArr.push(singleEventArr)
              }
  
  
              // for (const i in eventDetails) {
              //     console.log(`${event} holds ${eventDetails[i]}`)
              // }
          }
  
          setMyEvents(eventsArr)

          // let output = ""
          
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

            <button onClick={viewCremaRuns} >View My CremaRuns</button>
            <EventList eventsArr={myEvents}/>

            <p>{generateEventString()}</p>


            
        </div>
    
      );
    };
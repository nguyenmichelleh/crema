import React from 'react';
import { useState } from 'react';
import firebase from 'firebase';
import { UserContext, useUser, UserContextProvider} from "../context/userContext"
import EventList from "./EventList"
import AttendingList from "./AttendingList"
import {Accordion, Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Profile() {


    const [user] = useUser();
    const[currentUser, setUser] = useUser()
    const [myEvents, setMyEvents] = useState([])
    const [eventsAttending, setEventsAttending] = useState([])

    const LoginStatus = () => {
      const [user] = useUser();
    
      return (
        <div>{user === null ? '': `Welcome ${user.firstName}`}</div>
    
      );
    };


    const viewMyCremaRuns = () => {

      const eventsArr = []

      const dbRef = firebase.database().ref();
      dbRef.child("events").get().then((snapshot) => {
  
          console.log(snapshot.val())
          const events = snapshot.val()
  
          for (const event in events) {
              const singleEvent = {}
              var eventDetails = events[event]
  
              if (eventDetails.UID === user.UID) {
                singleEvent["id"] = event
                singleEvent["title"] = eventDetails.title
                singleEvent["start"] = eventDetails.start 
                singleEvent["end"] = eventDetails.end
                singleEvent["location"] = eventDetails.location
                singleEvent["numAttending"] = Object.values(eventDetails.attendees).length - 1
                eventsArr.push(singleEvent)

                console.log(singleEvent)


              }
          }

          setMyEvents(eventsArr)
          console.log(eventsArr)

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

    // const updateAccount = () => {

    // }

    const deleteAccount = () => {

      const loggedUser = user.UID
      
      const userRef = firebase.auth().loggedUser;

        userRef.delete().then(() => {
          const dbRef = firebase.database().ref();
          dbRef.child("users").child(loggedUser).remove() // this worked like two seconds ago?
          console.log("Deleted!")
          setUser(null)
        }).catch((error) => {
          // An error ocurred
          // ...
        });

      // You can't sign in without a full profile
      // So you have to remake your profile if you want a working acct

    
      // const dbRef = firebase.database().ref();
      // dbRef.child("users").child(loggedUser).remove() // this worked like two seconds ago?
      // console.log("Deleted!")
      // setUser(null)
    

    }


    return (
        
        <div className="profileFormat">

          <div className="leftHalf">
            <LoginStatus/>
            <br></br>
            <Card style={{ width: '35rem' }}>
              <Card.Body>
                <Card.Title>MyCrema Profile</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{user === null ? "Please log in to view profile." : `${user.firstName} ${user.lastName}, ${user.pronouns}`}</Card.Subtitle>
                <p>{user === null ? " " : `♡ ${user.favDrink}`}</p>
                <p>{user === null ? " " : `♡ ${user.favCafe}`}</p>
                <p>{user === null ? " " : `♡ ${user.bio}`}</p>
              </Card.Body>
            </Card>
            <br></br>
            <Button variant="outline-secondary" onClick={deleteAccount}>Delete Account</Button>
          </div>

          <div className="rightHalfProfile">
            <Card style={{ width: '35rem' }}>
              <Card.Body>
                <Card.Title>CremaRuns: Host</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Events I am hosting</Card.Subtitle>
                <Button variant="dark" onClick={viewMyCremaRuns} >View CremaRuns</Button>
                <EventList eventsArr={myEvents}/>
              </Card.Body>
            </Card>
            <br></br>
            <Card style={{ width: '35rem' }}>
              <Card.Body>
                <Card.Title>CremaRuns: Attendee</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Events I'd like to attend</Card.Subtitle>
                <Button variant="dark" onClick={viewRunsAttending} >View CremaRuns</Button>
                <AttendingList eventsArr ={eventsAttending}/>
              </Card.Body>
            </Card>


          </div>

            
        </div>
    
      );
    };


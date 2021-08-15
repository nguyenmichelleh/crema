import React from 'react';
import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { UserContext, useUser, UserContextProvider} from "../context/userContext"
import EventList from "./EventList"
import AttendingList from "./AttendingList"
import {Form, Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';

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


    const [myCremaRunsVisibility, setMyCremaRunsVisibility] = useState(false)
    const toggleViewMyCremaRuns = () => {

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

      setMyCremaRunsVisibility(!myCremaRunsVisibility)

    }

    const [runsAttendingVisibility, setRunsAttendingVisibility] = useState(false)
    const toggleViewRunsAttending = () => {

      const dbRef = firebase.database().ref();

      dbRef.child('attendees').orderByChild(user.UID).equalTo(true).on("value", function(snapshot) {
        console.log(snapshot.val()); // object of objects, all {eventIDs: {userIDs..}}
        snapshot.forEach(function(data) {
            console.log(data.key); // all eventIDs
        });

        // setEventsAttending(Object.keys(snapshot.val())) // array of all eventIDs
      
      const eventsAttendingArr = []

      
      if (snapshot.val() === null) {
        return setEventsAttending(eventsAttendingArr)
      }
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

      setRunsAttendingVisibility(!runsAttendingVisibility)

    }

    // const viewMyCremaRuns = () => {

    //   const eventsArr = []

    //   const dbRef = firebase.database().ref();
    //   dbRef.child("events").get().then((snapshot) => {
  
    //       console.log(snapshot.val())
    //       const events = snapshot.val()
  
    //       for (const event in events) {
    //           const singleEvent = {}
    //           var eventDetails = events[event]
  
    //           if (eventDetails.UID === user.UID) {
    //             singleEvent["id"] = event
    //             singleEvent["title"] = eventDetails.title
    //             singleEvent["start"] = eventDetails.start 
    //             singleEvent["end"] = eventDetails.end
    //             singleEvent["location"] = eventDetails.location
    //             singleEvent["numAttending"] = Object.values(eventDetails.attendees).length - 1
    //             eventsArr.push(singleEvent)

    //             console.log(singleEvent)


    //           }
    //       }

    //       setMyEvents(eventsArr)
    //       console.log(eventsArr)

    //   }
    //   )

      
    // }

    // const viewRunsAttending = () => {

    //   const dbRef = firebase.database().ref();

    //   dbRef.child('attendees').orderByChild(user.UID).equalTo(true).on("value", function(snapshot) {
    //     console.log(snapshot.val()); // object of objects, all {eventIDs: {userIDs..}}
    //     snapshot.forEach(function(data) {
    //         console.log(data.key); // all eventIDs
    //     });

    //     // setEventsAttending(Object.keys(snapshot.val())) // array of all eventIDs
      
    //   const eventsAttendingArr = []

    //   const eventIDs = Object.keys(snapshot.val()) // array of all eventIDs

    //   eventIDs.map(id => {
    //     return dbRef.child('events').child(id).on('value', function(snapshot) {
    //         console.log(snapshot.val());
    //         eventsAttendingArr.push(snapshot.val())
    //         setEventsAttending(eventsAttendingArr)
    //         console.log(eventsAttending)

    //     })

    //   });

    // });

    // }

    const customStyles = {
      content: {
        top: '8%',
        left: '15%',
        right: '15%',
        bottom: '5%',
      //   marginRight: '-50%',
      },
    };

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#c9184a';

    }
  
    function closeModal() {
      setIsOpen(false);
    }

    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[pronouns, setPronouns] = useState('');
    const[favDrink, setFavDrink] = useState('');
    const[favCafe, setFavCafe] = useState('');
    const[bio, setBio] = useState('');

    const handleOnChangeFirstName = (event) => {
        setFirstName(event.target.value);
    };

    const handleOnChangeLastName = (event) => {
        setLastName(event.target.value);
    };

    const handleOnChangePronouns = (input) => {
        setPronouns(input.target.value);
    };

    const handleOnChangeFavDrink = (event) => {
        setFavDrink(event.target.value);
    };

    const handleOnChangeFavCafe = (event) => {
        setFavCafe(event.target.value);
    };

    const handleOnChangeBio = (event) => {
        setBio(event.target.value);
    };

    const updateProfile = () => {

      const userRef = firebase.database().ref("/users"); // where you push
      // user.uid is child to user document
      userRef.child(user.UID).set({
          firstName: firstName,
          lastName: lastName,
          pronouns: pronouns,
          favDrink: favDrink,
          favCafe: favCafe,
          bio: bio,
      });

      setIsOpen(false);
  };

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

      <div>
        
        <div className="profileFormat">

          <div className="leftHalf">
            <LoginStatus/>
            <br></br>
            <Card style={{ width: '35rem' }}>
              <Card.Body>
                  <Card.Title>MyCrema Profile ☼</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{user === null ? "Please log in to view profile." : `${user.firstName} ${user.lastName}, ${user.pronouns}`}</Card.Subtitle>
                <br></br>
                <p>{user === null ? " " : `♡ ${user.favDrink}`}</p>
                <p>{user === null ? " " : `♡ ${user.favCafe}`}</p>
                <p>{user === null ? " " : `♡ ${user.bio}`}</p>
                <br></br>
                <Button variant="outline-secondary" onClick={openModal}>Update Profile</Button>
              </Card.Body>
            </Card>

          </div>

            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >

              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Update MyCrema Profile</h2>
              <p>Please fill out all fields in your update.  Changes will be applied during your next login.</p>
              <br></br>
              <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>First name:</Form.Label>
                  <Form.Control
                      type="text"
                      value={firstName}
                      onChange={handleOnChangeFirstName}
                      placeholder={user === null ? " " : `${user.firstName}`} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Last name:</Form.Label>
                  <Form.Control
                      type="text"
                      value={lastName}
                      onChange={handleOnChangeLastName}
                      placeholder={user === null ? " " : `${user.lastName}`} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Pronouns:</Form.Label>
                  <Form.Control
                      type="text"
                      value={pronouns}
                      onChange={handleOnChangePronouns}
                      placeholder={user === null ? " " : `${user.pronouns}`} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Favorite drink:</Form.Label>
                  <Form.Control
                      type="text"
                      value={favDrink}
                      onChange={handleOnChangeFavDrink}
                      placeholder={user === null ? " " : `${user.favDrink}`} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Favorite cafe:</Form.Label>
                  <Form.Control
                      type="text"
                      value={favCafe}
                      onChange={handleOnChangeFavCafe}
                      placeholder={user === null ? " " : `${user.favCafe}`} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Bio:</Form.Label>
                  <Form.Control
                      type="text"
                      value={bio}
                      onChange={handleOnChangeBio}
                      placeholder={user === null ? " " : `${user.bio}`} />
              </Form.Group>
              </Form>
              <Button variant="secondary" onClick={updateProfile} >Update</Button>

              </Modal>

          <div className="rightHalfProfile">
            <Card style={{ width: '35rem' }}>
              <Card.Body>
                <Card.Title>CremaRuns: Host</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Events I am hosting</Card.Subtitle>
                <br></br>
                {/* <Button variant="dark" onClick={viewMyCremaRuns} >View CremaRuns</Button> */}
                <Button variant="dark" onClick={toggleViewMyCremaRuns} >View/Hide CremaRuns</Button>
                {/* <EventList eventsArr={myEvents}/> */}
                <p>{myCremaRunsVisibility ? <EventList eventsArr={myEvents}/> : " "}</p>
              </Card.Body>
            </Card>
            <br></br>
            <Card style={{ width: '35rem' }}>
              <Card.Body>
                <Card.Title>CremaRuns: Attendee</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Events I'd like to attend</Card.Subtitle>
                <br></br>
                {/* <Button variant="dark" onClick={viewRunsAttending} >View CremaRuns</Button> */}
                {/* <AttendingList eventsArr ={eventsAttending}/> */}
                <Button variant="dark" onClick={toggleViewRunsAttending} >View/Hide CremaRuns</Button>
                <p>{runsAttendingVisibility ? <AttendingList eventsArr={eventsAttending}/> : " "}</p>
              </Card.Body>
            </Card>
            <br></br>

            <div className="deleteButton">
              <Button variant="outline-secondary" onClick={deleteAccount}>Delete Account</Button>
            </div>

          </div>
            
        </div>

        <img className="friendsUnderTree" src="images/friendsUnderTree.svg" alt="two friends conversing under tree"/>

        </div>
    
      );
    };


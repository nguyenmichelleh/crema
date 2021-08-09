
import React from 'react';
import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { UserContext, useUser, UserContextProvider} from "../context/userContext"
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import Modal from 'react-modal';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Calendar() {

    const [user] = useUser();
    const[events, setEvents] = useState([])
    // open modal based on event info
    const [eventInfoModal, setEventInfoModal] = React.useState(false);

    // Modal.setAppElement('body');

    
    useEffect (() => {

        // Modal.setAppElement('body');

        const eventsArr = []

        const dbRef = firebase.database().ref();
        dbRef.child("events").get().then((snapshot) => {

            const events = snapshot.val()

            for (const event in events) {
                const singleEvent = {}
                var eventDetails = events[event]
                singleEvent["id"] = event
                singleEvent["title"] = eventDetails.title
                singleEvent["start"] = eventDetails.start
                singleEvent["end"] = eventDetails.end
                eventsArr.push(singleEvent)
            }

            setEvents(eventsArr)
        }
        )

    },[]) // if i only render this the first time the render after delete doesnt upate events, if i delete a second time it renders the first change?

    let subtitle;

    const calendarAlert = (info) => {
        console.log(info)
        setEventInfoModal(info);
    }
  
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#c9184a';
    }
  
    function closeModal() {
      setEventInfoModal(false);
    }

    const joinCremaRun = () => {

        const userID = user.UID
        const test = {}
        test[userID] = true
        const userRef = firebase.database().ref("/attendees");
        userRef.child(eventInfoModal.event.id).update(test);

        const testRef = firebase.database().ref("/events")
        testRef.child(eventInfoModal.event.id).child("attendees").update(test);
        
        setEventInfoModal(false);

    };
     

    const[title, setTitle] = useState('');
    const[start, setStart] = useState('');
    const[end, setEnd] = useState('');
    const[location, setLocation] = useState('');

    const handleOnChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleOnChangeStart = (event) => {
        setStart(event.target.value);
    };

    const handleOnChangeEnd = (event) => {
        setEnd(event.target.value);
    };

    const handleOnChangeLocation= (input) => {
        setLocation(input.target.value);
    }
    

    const addCremaRun = () => {

        const currentUser = user.UID
        const currentUserObj = {}
        currentUserObj[currentUser] = true

        var eventsRef = firebase.database().ref('events');
        var newEventRef = eventsRef.push();
        newEventRef.set({
            UID: user.UID,
            name: user.firstName,
            title: title,
            start: start,
            end: end,
            location: location,
            attendees: currentUserObj
        });

        // const attendeesRef = firebase.database().ref("/attendees");
        // attendeesRef.child(eventInfoModal.event.id).update(currentUserObj);

        const eventsArr = []
        const dbRef = firebase.database().ref();
        dbRef.child("events").get().then((snapshot) => {

            console.log(snapshot.val())
            const events = snapshot.val()

            for (const event in events) {
                const singleEvent = {}
                var eventDetails = events[event]
                singleEvent["id"] = event
                singleEvent["name"] = eventDetails.name
                singleEvent["title"] = eventDetails.title
                singleEvent["start"] = eventDetails.start
                singleEvent["end"] = eventDetails.end
                singleEvent["location"] = eventDetails.location
                eventsArr.push(singleEvent)

            }
            setEvents(eventsArr)
            console.log(eventsArr)

        }
        )
    };

    const deleteCremaRun = () => {
        
        // 1. obtain info for clicked event
        // 2. remove from database (2 places)
        // 3. obtain updated events array
        // 4. pass through Fullcalendar component
        // 5. if you have time, user.UID should equal event creator UID

        const dbRef = firebase.database().ref();

        dbRef.child("events").get().then((snapshot) => {
    
            const events = snapshot.val()
    
            for (const event in events) {
                var eventDetails = events[event]
    
                if (eventDetails.UID === user.UID) {
                    dbRef.child("events").child(eventInfoModal.event.id).remove() // this worked like two seconds ago?
                    dbRef.child("attendees").child(eventInfoModal.event.id).remove() 
                    console.log("Event deleted!")
                } else {
                    console.log("You can't do that!")
                }
            }

            const eventsArr = []
            dbRef.child("events").get().then((snapshot) => {
    
                const events = snapshot.val()
    
                for (const event in events) {
                    const singleEvent = {}
                    var eventDetails = events[event]
                    singleEvent["id"] = event
                    singleEvent["title"] = eventDetails.title
                    singleEvent["start"] = eventDetails.start
                    singleEvent["end"] = eventDetails.end
                    eventsArr.push(singleEvent)
                }
    
                setEvents(eventsArr)
            }
            )
    
            setEventInfoModal(false);

        }
        )
        // // close modal
        // setEventInfoModal(false);


    };

    const updateCremaRun = () => {
        
        // 1. obtain info for clicked event
        // 2. update under events doc
        // 3. obtain updated events array
        // 4. pass through Fullcalendar component
        // 5. if you have time, user.UID should equal event creator UID

        const dbRef = firebase.database().ref();

        dbRef.child("events").get().then((snapshot) => {
    
            const events = snapshot.val()
    
            for (const event in events) { 
                var eventDetails = events[event]
    
                if (eventDetails.UID === user.UID) {
                    dbRef.child("events").child(eventInfoModal.event.id).update({
                        title: title,
                        start: start,
                        end: end,
                        location: location,
                    })

                    console.log("Event updated!")
                }
            }

            const eventsArr = []
            dbRef.child("events").get().then((snapshot) => {
    
                const events = snapshot.val()
    
                for (const event in events) {
                    const singleEvent = {}
                    var eventDetails = events[event]
                    singleEvent["id"] = event
                    singleEvent["title"] = eventDetails.title
                    singleEvent["start"] = eventDetails.start
                    singleEvent["end"] = eventDetails.end
                    eventsArr.push(singleEvent)
                }
    
                setEvents(eventsArr)
            }
            )
    
            setEventInfoModal(false);

        }
        )
    };


      return (

        <div className="calendarFormat">
            {/* <h4>CremaRun Scheduler</h4>
            <p>Title:</p>
            <input type="text" onChange={handleOnChangeTitle} value={title}/>
            <p>Start:</p>
            <input type="date" id="dateInput" onChange={handleOnChangeStart} value={start}/>
            <input type="time" id="timeInput"/>
            <p><span id="selectedDay">(Selected Day) </span>End Time:</p>
            <input type="time" id="timeInput"/>
            <p>Location:</p>
            <input type="text" onChange={handleOnChangeLocation}/>
            <br></br>
            <button id="addButton" onClick={addCremaRun}>Add Crema Run</button> */}

            <div className="leftHalfCalendar">
                <h1>CremaCal 🍵</h1>
                <br></br>
                <Form>
                <h4>CremaRun Scheduler</h4>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={handleOnChangeTitle}
                        placeholder="Python over Coffee" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Start:</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={start}
                        onChange={handleOnChangeStart} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>End:</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={end}
                        onChange={handleOnChangeEnd} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Location:</Form.Label>
                    <Form.Control
                        type="text"
                        value={location}
                        onChange={handleOnChangeLocation}
                        placeholder="Starbucks Shibuya Tsutaya" />
                </Form.Group>
                </Form>
                <Button variant="dark" onClick={addCremaRun} >Add CremaRun</Button>
            </div>
            
            <div className="rightHalfCalendar">
                <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin, listPlugin ]}
                initialView="dayGridMonth"
                events={events}
                eventClick={calendarAlert}
                />
            </div>

            <br></br>
            <div className="modalContent">
                <Modal
                    isOpen={eventInfoModal}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    // ariaHideApp={false}
                    appElement={document.getElementById('app')}
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Join CremaRun</h2>
                    <div>Are you interested in attending this event?</div>
                    <br></br>
                    <p>{eventInfoModal === false ? 'No data available' : `Title: ${eventInfoModal.event.title}`}</p>
                    <p>{eventInfoModal === false ? 'No data available' : `Start: ${eventInfoModal.event.start}`}</p>
                    <p>{eventInfoModal === false ? 'No data available' : `End: ${eventInfoModal.event.end}`}</p>
                    <br></br>
                    <Button variant="outline-dark" onClick={joinCremaRun}>Join CremaRun ✅</Button> <Button variant="outline-dark" onClick={closeModal}>No, thank you! ❎</Button>

                    <br></br>
                    <br></br>
                    <br></br>
                    <p>You can only delete CremaRuns you host.</p>
                    <Button variant="warning" onClick={deleteCremaRun}>Delete CremaRun </Button>

                    <br></br>
                    <br></br>
                    <br></br>
                    <Form>
                    <h4>Update Event</h4>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={handleOnChangeTitle}
                            placeholder="Python over Coffee" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Start:</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={start}
                            onChange={handleOnChangeStart} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>End:</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={end}
                            onChange={handleOnChangeEnd} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Location:</Form.Label>
                        <Form.Control
                            type="text"
                            value={location}
                            onChange={handleOnChangeLocation}
                            placeholder="Starbucks Shibuya Tsutaya" />
                    </Form.Group>
                    </Form>
                    <Button variant="dark" onClick={updateCremaRun} >Update CremaRun</Button>

                </Modal>
            </div>

    
        </div>
      )
    }

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
//
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';


export default function Calendar() {

    const [user] = useUser();
    const[events, setEvents] = useState([])
    // open modal based on event info
    const [eventInfoModal, setEventInfoModal] = React.useState(false);
    const [eventLocation, setEventLocation] = useState('');
    const [eventPhysicalLocation, setPhysicalLocation] = useState('');

    // Modal.setAppElement('body');

    
    useEffect (() => {

        // Modal.setAppElement('#root');

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

    const calendarAlert = (info) => {
        console.log(info)
        setEventInfoModal(info);

        const dbRef = firebase.database().ref();

        dbRef.child("events").get().then((snapshot) => {
        
            const events = snapshot.val()
        
            for (const event in events) { 
                var eventDetails = events[event]
        
                if (info.event.id === event) {
                    setEventLocation(eventDetails.location)
                    setPhysicalLocation(eventDetails.address)
                }

            }
        
        }
        )
        
    }
  

    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#c9184a';
    }
  
    function closeModal() {
      setEventInfoModal(false);
    }

    const [userEventStatus, setUserEventStatus] = useState(false)

    const joinCremaRun = () => {

        const testRef = firebase.database().ref("/events")
        testRef.child(eventInfoModal.event.id).child("attendees").get().then((snapshot) => {
            const attendeesAndUser = snapshot.val()

            for (const attendeeID in attendeesAndUser) {

                if (attendeeID === user.UID) {
                    
                    setUserEventStatus(true);
                    console.log("I found me!")

                }
            }
        });

        if (userEventStatus === false) {

            const userID = user.UID
            const test = {}
            test[userID] = true

            const userRef = firebase.database().ref("/attendees");
            userRef.child(eventInfoModal.event.id).update(test);

            const testRef = firebase.database().ref("/events")
            testRef.child(eventInfoModal.event.id).child("attendees").update(test);
            console.log("Joined!")

        } else {
            console.log("You made this")
        }



        // const userID = user.UID
        // const test = {}
        // test[userID] = true

        // const userRef = firebase.database().ref("/attendees");
        // userRef.child(eventInfoModal.event.id).update(test);

        // const testRef = firebase.database().ref("/events")
        // testRef.child(eventInfoModal.event.id).child("attendees").update(test);
        
        setEventInfoModal(false);

    };
     

    const[title, setTitle] = useState('');
    const[start, setStart] = useState('');
    const[end, setEnd] = useState('');
    // const[location, setLocation] = useState('');

    const handleOnChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleOnChangeStart = (event) => {
        setStart(event.target.value);
    };

    const handleOnChangeEnd = (event) => {
        setEnd(event.target.value);
    };

    // const handleOnChangeLocation= (input) => {
    //     setLocation(input.target.value);
    // }
    

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
            location: inputAddress,
            address: eventAddress,
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
                singleEvent["location"] = eventDetails.inputAddress
                singleEvent["address"] = eventDetails.eventAddress
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
    
                if ((eventDetails.UID === user.UID) && (eventInfoModal.event.id === event)) {
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


    const[updatedTitle, setUpdatedTitle] = useState('');
    const[updatedStart, setUpdatedStart] = useState('');
    const[updatedEnd, setUpdatedEnd] = useState('');

    const handleOnChangeUpdatedTitle = (event) => {
        setUpdatedTitle(event.target.value);
    };

    const handleOnChangeUpdatedStart = (event) => {
        setUpdatedStart(event.target.value);
    };

    const handleOnChangeUpdatedEnd = (event) => {
        setUpdatedEnd(event.target.value);
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
    
                if ((eventDetails.UID === user.UID) && (eventInfoModal.event.id === event)) {
                    dbRef.child("events").child(eventInfoModal.event.id).update({
                        title: updatedTitle,
                        start: updatedStart,
                        end: updatedEnd,
                        location: updatedInputAddress,
                        address: updatedEventAddress
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

    // autocomplete stuff

    // const placesCustomStyles = {
    //     content: {
    //       border
    //     },
    //   };

    const [inputAddress, setInputAddress] = React.useState("");
    const [eventAddress, setEventAddress] = React.useState("");
    
    const handleSelect = async (value) => {
        const result = await geocodeByAddress(value)
        
        for (const key in result) {
            var item = result[key]

            setEventAddress(item.formatted_address)
            setInputAddress(value)

        }

    }

    const [updatedInputAddress, setUpdatedInputAddress] = React.useState("");
    const [updatedEventAddress, setUpdatedEventAddress] = React.useState("");
    
    const handleUpdatedSelect = async (value) => {
        const result = await geocodeByAddress(value)
        
        for (const key in result) {
            var item = result[key]

            setUpdatedEventAddress(item.formatted_address)
            setUpdatedInputAddress(value)

        }

    }



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
                <br></br>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={handleOnChangeTitle}
                        placeholder="Python + Coffee" />
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
                {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Location:</Form.Label>
                    <Form.Control
                        type="text"
                        value={location}
                        onChange={handleOnChangeLocation}
                        placeholder="Starbucks Shibuya Tsutaya" />
                </Form.Group> */}
                </Form>

                <p>Location: </p>
                <PlacesAutocomplete 
                    value={inputAddress}
                    onChange={setInputAddress}
                    onSelect={handleSelect}
                    // style={placesCustomStyles}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => ( 
                            <div>

                                <input {...getInputProps({ placeholder: "Search" })} />
                                <div>{loading ? '...looking around' : null}</div>
                                
                                {suggestions.map((suggestion) => {
                                    const style = {
                                        backgroundColor: suggestion.active ? "#fae1dd" : "#fcd5ce"
                                    }
                                    return <div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>;
                                })}
                                
                                <p className="addressText"><em>{eventAddress}</em></p>

                            </div> 
                        )}
                </PlacesAutocomplete>

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
                    style={customStyles}
                    contentLabel="Example Modal"
                    // ariaHideApp={false}
                    // appElement={document.getElementById('app')}
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Join CremaRun</h2>
                    <div>Are you interested in attending this event?</div>
                    <br></br>
                    <p>{eventInfoModal === false ? 'No data available' : `Title: ${eventInfoModal.event.title}`}</p>
                    <p>{eventInfoModal === false ? 'No data available' : `Start: ${eventInfoModal.event.start}`}</p>
                    <p>{eventInfoModal === false ? 'No data available' : `End: ${eventInfoModal.event.end}`}</p>
                    <p>{eventInfoModal === false ? 'No data available' : `Location: ${eventLocation}`}</p>
                    <p>{eventInfoModal === false ? 'No data available' : `Address: ${eventPhysicalLocation}`}</p>
                    <br></br>
                    <Button variant="dark" onClick={joinCremaRun}>Join CremaRun  ✅</Button> <Button variant="dark" onClick={closeModal}>No, thank you!  ❎</Button>

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Form>
                    <h4>Update CremaRun</h4>
                    <p>You can only modify events you host.</p>
                    <br></br>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="text"
                            value={updatedTitle}
                            onChange={handleOnChangeUpdatedTitle}
                            placeholder={eventInfoModal === false ? 'No data available' : `${eventInfoModal.event.title}`} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Start:</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={updatedStart}
                            onChange={handleOnChangeUpdatedStart} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>End:</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={updatedEnd}
                            onChange={handleOnChangeUpdatedEnd} />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Location:</Form.Label>
                        <Form.Control
                            type="text"
                            value={location}
                            onChange={handleOnChangeLocation}
                            placeholder="Starbucks Shibuya Tsutaya" />
                    </Form.Group> */}
                    </Form>

                    <p>Location: </p>
                    <PlacesAutocomplete 
                        value={updatedInputAddress}
                        onChange={setUpdatedInputAddress}
                        onSelect={handleUpdatedSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => ( 
                                <div>

                                    <input {...getInputProps({ placeholder: `${eventLocation}` })} />
                                    <div>{loading ? '...looking around' : null}</div>
                                    
                                    {suggestions.map((suggestion) => {
                                        const style = {
                                            backgroundColor: suggestion.active ? "#fae1dd" : "#fcd5ce"
                                        }
                                        return <div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>;
                                    })}

                                </div> 
                            )}
                    </PlacesAutocomplete>
                    <br></br>
                    <Button variant="secondary" onClick={updateCremaRun} >Update CremaRun</Button>

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h4>Delete CremaRun</h4>
                    <p>You can only delete events you host.</p>
                    <Button variant="secondary" onClick={deleteCremaRun}>Delete CremaRun </Button>

                </Modal>
            </div>

    
        </div>
      )
    }
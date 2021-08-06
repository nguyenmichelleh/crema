
import React from 'react';
import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { UserContext, useUser, UserContextProvider} from "../context/userContext"
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import Modal from 'react-modal';

export default function Calendar() {

    const [user] = useUser();
    const[events, setEvents] = useState([])
    // open modal based on event info
    const [eventInfoModal, setEventInfoModal] = React.useState(false);

    
    useEffect (() => {

        const eventsArr = []

        const dbRef = firebase.database().ref();
        dbRef.child("events").get().then((snapshot) => {

            console.log(snapshot.val())
            const events = snapshot.val()

            for (const event in events) {
                const singleEvent = {}
                var eventDetails = events[event]
                singleEvent["id"] = event
                singleEvent["title"] = eventDetails.title
                singleEvent["start"] = eventDetails.start 
                eventsArr.push(singleEvent)
            }

            setEvents(eventsArr)
        }
        )

    }, [])

    let subtitle;

    const calendarAlert = (info) => {
        console.log(info)
        alert(`CremaRun Title: ${info.event.title}\nCremaRun Start:  ${info.event.start}\n\nPlease click OK to add or skip this event.`)
        setEventInfoModal(info);
    }
  
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#bdccde';
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
        
        console.log("hello")
        setEventInfoModal(false);

    };
   

    

    // const[userID, setUserID] = useState('');
    const[title, setTitle] = useState('');
    // const[day, setDay] = useState('');
    const[start, setStart] = useState('');
    // const[end, setEnd] = useState('');

    const handleOnChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleOnChangeStart = (event) => {
        setStart(event.target.value);
    };

    // const handleOnChangeEnd = (input) => {
    //     setEnd(input.target.value);
    // }
    

    const addCremaRun = () => {

        var eventsRef = firebase.database().ref('events');
        var newEventRef = eventsRef.push();
        newEventRef.set({
            UID: user.UID,
            name: user.firstName,
            title: title,
            start: start,
        });

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
                singleEvent["guests"] = eventDetails.guests
                eventsArr.push(singleEvent)

                // for (const i in eventDetails) {
                //     console.log(`${event} holds ${eventDetails[i]}`)
                // }
            }
            setEvents(eventsArr)
            console.log(eventsArr)
        }
        )
    };


      return (

        <div>
            <h4>CremaRun Scheduler</h4>
            <p>Title:</p>
            <input type="text" onChange={handleOnChangeTitle} value={title}/>
            <p>Start:</p>
            <input type="date" id="dateInput" onChange={handleOnChangeStart} value={start}/>
            <input type="time" id="timeInput"/>
            <p><span id="selectedDay">(Selected Day) </span>End Time:</p>
            <input type="time" id="timeInput"/>
            <p>Location:</p>
            <input type="text"/>
            <br></br>
            <button id="addButton" onClick={addCremaRun}>Add Crema Run</button>
        
            <h1>CremaCal</h1>

        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin, listPlugin ]}
          initialView="dayGridMonth"
          events={events}
          eventClick={calendarAlert}
        />

        <Modal
            isOpen={eventInfoModal}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            // ariaHideApp={false}
            contentLabel="Example Modal"
        >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Join CremaRun</h2>
            <div>Are you interested in attending this event?</div>
            <br></br>
            <button onClick={joinCremaRun}>Join CremaRun ✅</button> <button onClick={closeModal}>No, thank you! ❎</button>
        </Modal>

        </div>
      )
    }

import React from 'react';
import { useState } from 'react';
import firebase from 'firebase';
import { UserContext, useUser, UserContextProvider} from "../context/userContext"
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Calendar() {
    
    const [user] = useUser();

    const[events, setEvents] = useState([])

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
            title: title,
            start: start,
        });

        // push to users document an arr of events?

        // the events array needs to hold 
        // events={[
        //     { title: 'event 1', date: '2019-04-01' },
        //     { title: 'event 2', date: '2019-04-02' }
        //   ]}
        // add unique events identifier as ID of event for clickability later
        // is this going to have to render on useEffect?
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

                // for (const i in eventDetails) {
                //     console.log(`${event} holds ${eventDetails[i]}`)
                // }
            }
            setEvents(eventsArr)
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
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          events={events}
        //   events={[{id: 22, title: 'cat', start: '2021-08-03'}]}
        />
        </div>
      )
    }

// const[title, setTitle] = useState('');
// const[day, setDay] = useState('');
// const[startTime, setStartTime] = useState('');
// const[endTime, setEndTime] = useState('');

// const handleOnChangeDay= (event) => {
//     const selectedDay = document.querySelector('#dateInput');
//     selectedDay.textContent = event.target.value;
// };

// const readSelectedDay = (event) => {
//     const selectedDay = document.querySelector('#dateInput');
//     selectedDay.textContent = event.target.value;
// };

// input.addEventListener('input', (event) => {
//     selectedDay.textContent = event.target.value;
// })

// need to pass in data from form into events: []


// -----

// document.addEventListener('DOMContentLoaded', function() {
//     var calendarEl = document.getElementById('calendar');

//     var calendar = new FullCalendar.Calendar(calendarEl, {
//         eventClick: function(info) {
//             var eventObj = info.event;
    
//             if (eventObj.url) {
//               alert(
//                 'Title: ' + eventObj.title + '.\n' +
//                 'Start: ' + eventObj.start + '.\n' +
//                 'End: ' + eventObj.end + '.\n' +
//                 'Link: ' + eventObj.url + ' in a new tab'
//               );
    
//               window.open(eventObj.url);
    
//               info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
//             } else {
//               alert('Clicked ' + eventObj.title);
//             }
//           },
//       initialView: 'dayGridMonth',
//       initialDate: '2021-07-07',
//       headerToolbar: {
//         left: 'prev,next today',
//         center: 'title',
//         right: 'dayGridMonth,timeGridWeek,timeGridDay'
//       },
//       events: [
//         {
//           title: 'All Day Study Sesh',
//           id: 'z1nJuL9c6vT3F1nEldc7zb4FY6j1',
//           url: 'https://www.google.com/search?q=starbucks%20near%20me&sxsrf=ALeKk02lCBTLJtKLKFm9yMXp0cUvC0GjAw:1627891518918&ei=OKcHYYDSEJDJ0PEP27-yyAE&oq=starbucks+near+me&gs_lcp=Cgdnd3Mtd2l6EAMyDggAEIAEELEDEIMBEMkDMgUIABCSAzIFCAAQkgMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgcIABBHELADOggIABCSAxCwAzoQCC4QxwEQowIQsAMQyAMQQzoHCAAQsQMQQzoNCAAQsQMQgwEQyQMQQzoLCC4QgAQQxwEQrwE6BAgAEEM6CAgAEIAEELEDOhMIABCABBCHAhCxAxCDARDJAxAUOgoIABCABBCHAhAUSgUIOBIBMUoECEEYAFD8FVjsHmDPH2gBcAJ4AIABwASIAe8JkgEHNy4xLjUtMZgBAKABAcgBD8ABAQ&sclient=gws-wiz&ved=2ahUKEwjRzd698JHyAhXFGjQIHYgMC5EQvS4wB3oECA8QHg&uact=5&tbs=lf:1,lf_ui:4&tbm=lcl&rflfq=1&num=10&rldimm=1972782692553552946&lqi=ChFzdGFyYnVja3MgbmVhciBtZSIGiAEBkAEBSP3U3MjlgICACFodEAAYACIRc3RhcmJ1Y2tzIG5lYXIgbWUqBAgCEACSAQtjb2ZmZWVfc2hvcKoBERABKg0iCXN0YXJidWNrcygA&rlst=f#rlfi=hd:;si:1972782692553552946,l,ChFzdGFyYnVja3MgbmVhciBtZSIGiAEBkAEBSP3U3MjlgICACFodEAAYACIRc3RhcmJ1Y2tzIG5lYXIgbWUqBAgCEACSAQtjb2ZmZWVfc2hvcKoBERABKg0iCXN0YXJidWNrcygA;mv:[[47.8688679,-122.2001107],[47.7855432,-122.29947870000001]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!2m1!1e3!3sIAE,lf:1,lf_ui:4',
//           start: '2021-07-01'
//         },
//         {
//           title: 'Long Event',
//           start: '2021-07-07',
//           end: '2021-07-10'
//         },
//         {
//           groupId: '999',
//           title: 'Repeating Event',
//           start: '2021-07-09T16:00:00'
//         },
//         {
//           groupId: '999',
//           title: 'Repeating Event',
//           start: '2021-07-16T16:00:00'
//         },
//         {
//           title: 'Conference',
//           start: '2021-07-11',
//           end: '2021-07-13'
//         },
//         {
//           title: 'Meeting',
//           start: '2021-07-12T10:30:00',
//           end: '2021-07-12T12:30:00'
//         },
//         {
//           title: 'Lunch',
//           start: '2021-07-12T12:00:00'
//         },
//         {
//           title: 'Meeting',
//           start: '2021-07-12T14:30:00'
//         },
//         {
//           title: 'Birthday Party',
//           start: '2021-07-13T07:00:00'
//         },
//         {
//           title: 'Click for Google',
//           url: 'http://google.com/',
//           start: '2021-07-28'
//         }
//       ]
//     });

//     calendar.render();
//   });


// import React from 'react';
// import { useState } from 'react';
// import firebase from 'firebase';
// import { UserContext, useUser, UserContextProvider} from "../context/userContext"


// export default function Calendar() {

//     function postEvent(data) {
//         var calendarEl = document.getElementById('calendar');
    
//         var calendar = new FullCalendar.Calendar(calendarEl, {
//         initialView: 'dayGridMonth',
//         initialDate: '2021-07-07',
//         headerToolbar: {
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay'
//         },
//         events: data, // replace data with what you'd like to pass through
//         });
    
//         calendar.render();
//         }

//     return (

//     <body>
//         <div id='calendar'></div>
//         <h4>Please fill out your profile information below: </h4>
//             <p>Title:</p>
//             <input type="text" onChange={handleOnChangeFirstName} value={firstName} />
//             <p>Start:</p>
//             <input type="text" onChange={handleOnChangeLastName} value={lastName} />
//             <p>Stop:</p>
//             <input type="text" onChange={handleOnChangePronouns} value={pronouns} />
//             <br></br>
//             <button onClick={postEvent} >Create Account</button>
//             <br></br>
            

//             <button onClick={signIn} >Log In</button> 
//             <br></br>

//     </body>


//     )
//     }
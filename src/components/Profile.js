import React from 'react';
import { useState } from 'react';
import firebase from 'firebase';

export default function Profile() {
    
    const[currentUser, setCurrentUser] = useState('')

    const getUserProfile = () => {

        const dbRef = firebase.database().ref();
        dbRef.child("users").child("z1nJuL9c6vT3F1nEldc7zb4FY6j1").get().then((snapshot) => {
          if (snapshot.exists()) {
            // console.log(snapshot.val());
            // i added this
            // setCurrentUser(snapshot.val())

            const currentProfile = snapshot.val();
            const profileStats = []

            for (let dataKey in currentProfile) {
                console.log(dataKey)
                profileStats.push(currentProfile[dataKey]);
            }

            setCurrentUser(profileStats)
            console.log(profileStats)

          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });

    
    
    };

    return (
        <div>
                <p><strong>First Name: </strong>{currentUser[3]}</p>
                <p><strong>Last Name: </strong>{currentUser[4]}</p>
                <p><strong>Pronouns: </strong>{currentUser[5]}</p>
                <p><strong>Favorite Cafe: </strong>{currentUser[1]}</p>
                <p><strong>Favorite Drink: </strong>{currentUser[2]}</p>
                <p><strong>Bio: </strong>{currentUser[0]}</p>

                <button onClick={getUserProfile} >Current User Profile</button>

  

        </div>
    )
}
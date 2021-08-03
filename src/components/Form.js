import React from 'react';
import { useState } from 'react';
import firebase from 'firebase';
import { UserContext, useUser, UserContextProvider} from "../context/userContext"


export default function Form() {

// useUser() - hooks are magic, not a function being called

    const[currentUser, setUser] = useUser()

    const[newUser, setNewUser] = React.useState({
        email: "",
        password: ""
    });

    function handleOnChangeNewUser(event) {
        const value = event.target.value;
        setNewUser({
            ...newUser,
            [event.target.name]: value
        })
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

    const createUser = () => {

        firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((userCredential) => {

            const userRef = firebase.database().ref("/users"); // where you push
                // user.uid is child to user document
                userRef.child(userCredential.user.uid).set({
                    firstName: firstName,
                    lastName: lastName,
                    pronouns: pronouns,
                    favDrink: favDrink,
                    favCafe: favCafe,
                    bio: bio,
                });
        
            })
            .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            });
    
    }


    const signIn = () => {

        firebase.auth().signInWithEmailAndPassword(newUser.email, newUser.password)
            .then((userCredential) => {
            var user = userCredential.user;


            const dbRef = firebase.database().ref();
            dbRef.child("users").child(userCredential.user.uid).get().then((snapshot) => {
            if (snapshot.exists()) {

                console.log(snapshot.val())
                console.log(userCredential.user.uid)

                const userSnapshot = snapshot.val()
                userSnapshot["UID"] = userCredential.user.uid

                console.log(userSnapshot)

                setUser(userSnapshot)


            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });
            })
            .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            });
    
    };

    const signOut = () => {


        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log(firebase.auth().currentUser)
          }).catch((error) => {
            // An error happened.
          });

        setUser(null)

    }



    if (currentUser !== null) {
        return (
          <button type="button" onClick={signOut}>
            Log out
          </button>
        );
      }

    // if (currentUser !== null) {
    //     return (
    //       <button id="logout" type="button" onClick={() => setUser(null)}>
    //         Log out
    //       </button>
    //     );
    //   }

    return (
        <div>

            <form>
                <label>
                    E-mail:
                    <input
                    type="text"
                    name="email"
                    value={newUser.email}
                    onChange={handleOnChangeNewUser}
                    />
                </label>
                <br></br>
                <label>
                    Password:
                    <input
                    type="text"
                    name="password"
                    value={newUser.password}
                    onChange={handleOnChangeNewUser}
                    />
                </label>
                </form>


                <h4>Please fill out your profile information below: </h4>
                <p>First name:</p>
                <input type="text" onChange={handleOnChangeFirstName} value={firstName} />
                <p>Last name:</p>
                <input type="text" onChange={handleOnChangeLastName} value={lastName} />
                <p>Pronouns:</p>
                <input type="text" onChange={handleOnChangePronouns} value={pronouns} />
                <p>Favorite drink:</p>
                <input type="text" onChange={handleOnChangeFavDrink} value={favDrink} />
                <p>Favorite cafe:</p>
                <input type="text" onChange={handleOnChangeFavCafe} value={favCafe} />
                <p>Bio:</p>
                <input type="text" onChange={handleOnChangeBio} value={bio} />

                <br></br>
                <button onClick={createUser} >Create Account</button>
                <br></br>
                

                <button onClick={signIn} >Log In</button> 
                <br></br>


        </div>
    )
}
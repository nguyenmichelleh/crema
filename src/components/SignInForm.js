import React from 'react';
import { useState } from 'react';
import firebase from 'firebase';
import { UserContext, useUser, UserContextProvider} from "../context/userContext"
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function SignInForm() {

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

    const[cremaUser, setCremaUser] = React.useState({
        email: "",
        password: ""
    });

    function handleOnChangeCremaUser(event) {
        const value = event.target.value;
        setCremaUser({
            ...cremaUser,
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

        setNewUser({
            email: "",
            password: ""
        })

        setFirstName("")
        setLastName("")
        setPronouns("")
        setFavDrink("")
        setBio("")
    
    }


    const signIn = () => {

        firebase.auth().signInWithEmailAndPassword(cremaUser.email, cremaUser.password)
            // .then((userCredential) => {
            // var user = userCredential.user;

            // console.log(JSON.stringify(userCredential.user))

            // const dbRef = firebase.database().ref();
            // dbRef.child("users").child(userCredential.user.uid).get().then((snapshot) => {
            // if (snapshot.exists()) {

            //     const userSnapshot = snapshot.val()
            //     userSnapshot["UID"] = userCredential.user.uid
            //     setUser(userSnapshot)

            // } else {
            //     console.log("No data available");
            // }
            // }).catch((error) => {
            // console.error(error);
            // });
            // })
            // .catch((error) => {
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // });
    
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

    const [user] = useUser();

    if (currentUser !== null) {
        return (
            <div className="loginSuccess">
                <div>{user === null ? '': `You're logged in, ${user.firstName}.`}</div>
                <br></br>
                <Button variant="outline-secondary" onClick={signOut}>Log Out</Button>
            </div>

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
        <div className="signInFormat">

            <div className="leftHalf">
                <Form>
                    <h4>Sign In</h4>
                    <br></br>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>E-mail address:</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            value={cremaUser.email}
                            onChange={handleOnChangeCremaUser}
                            placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="text"
                            name="password"
                            value={cremaUser.password}
                            onChange={handleOnChangeCremaUser}
                            placeholder="******" />
                    </Form.Group>
                    </Form>

                    <Button variant="dark" onClick={signIn} >Log In</Button> 
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <img className="friendOpeningShutters" src="images/friendOpeningShutters.svg" alt="friend opening shutters with welcoming expression"/>
            </div>

             
{/* 
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
                </form> */}

            <div className="rightHalf">
                <Form>
                <h4>New user?  Please fill out your profile below to join: </h4>
                <br></br>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>E-mail address:</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        value={newUser.email}
                        onChange={handleOnChangeNewUser}
                        placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="text"
                        name="password"
                        value={newUser.password}
                        onChange={handleOnChangeNewUser}
                        placeholder="******" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>First name:</Form.Label>
                    <Form.Control
                        type="text"
                        value={firstName}
                        onChange={handleOnChangeFirstName}
                        placeholder="Ada" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Last name:</Form.Label>
                    <Form.Control
                        type="text"
                        value={lastName}
                        onChange={handleOnChangeLastName}
                        placeholder="Lovelace" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Pronouns:</Form.Label>
                    <Form.Control
                        type="text"
                        value={pronouns}
                        onChange={handleOnChangePronouns}
                        placeholder="No pronouns" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Favorite drink:</Form.Label>
                    <Form.Control
                        type="text"
                        value={favDrink}
                        onChange={handleOnChangeFavDrink}
                        placeholder="Iced mocha" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Favorite cafe:</Form.Label>
                    <Form.Control
                        type="text"
                        value={favCafe}
                        onChange={handleOnChangeFavCafe}
                        placeholder="Seattle Coffee Works" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Bio:</Form.Label>
                    <Form.Control
                        type="text"
                        value={bio}
                        onChange={handleOnChangeBio}
                        placeholder="Anything else you'd like to share?  Allergies?" />
                </Form.Group>
                </Form>

                <Button variant="dark" onClick={createUser} >Create Account</Button>
                <br></br>
                {/* <p>Hit 'Create Account', then log in using the form to the left!</p> */}
                <br></br>
                <br></br>

            </div>

                

                {/* <p>First name:</p>
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
                <input type="text" onChange={handleOnChangeBio} value={bio} /> */}



        </div>
    )
}
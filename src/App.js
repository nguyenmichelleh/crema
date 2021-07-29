import logo from './logo.svg';
import './App.css';
import React from 'react';
import Form from "./components/Form";
import firebase from 'firebase';


function App() {

  // useEffect(() => {
  //   const userRef = firebase.database().ref("/users");

  //   userRef.on("value",(snapshot)) => {
  //     console.log(snapshot.val());
  //     const
  //     for (let )

  //   }



  // }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crema</h1>
        <Form />

      </header>
    </div>
  );
}

export default App;

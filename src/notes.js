const createUser = () => {

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        // ...
        })
        .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        });
    
        const handleOnChangePronouns = (input) => {
            setPronouns(input.target.value);
        };

}


const signIn = () => {

    // sign in existing user 
    firebase.auth().signInWithEmailAndPassword("michellehn000@gmail.com", "password")
        .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        })
        .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        });

    // const userRef = firebase.database().ref("/users"); // where you push

    // const newUser = {
    //     user,
    //     pronouns,
    //     // fav_drink,
    //     // fav_cafe,
    //     // bio
    // };

    // userRef.push(newUser)

};

            <p>Name:</p>
            <input type="text" onChange={handleOnChangeUser} value={user} />

            <p>Pronouns:</p>
            <input type="text" onChange={handleOnChangePronouns} value={pronouns} />


            <br></br>
            <button onClick={createUser} >Add User</button>

            <p>E-mail:</p>
            <input type="text" onChange={handleOnChangeEmail} value={email} />
            <p>Password:</p>
            <input type="text" onChange={handleOnChangePassword} value={password} />
            
            <button onClick={createUser} >Add User</button>

            {/* <input type="text" onChange={handleOnChange} value={user} />
            <input type="text" onChange={handleOnChange} value={user} />
            <input type="text" onChange={handleOnChange} value={user} /> */}
            {/* <button onClick={createUser} >Add User</button> */}
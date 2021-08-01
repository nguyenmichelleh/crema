import React from 'react';
import { useState } from 'react';
import firebase from 'firebase';
import { UserContext, useUser, UserContextProvider} from "../context/userContext"

export default function Profile() {
    
    const [user] = useUser();

    return (
        
        <div>
            <h3>MyCrema Profile</h3>
            <p>{user === null ? "Please log in to view profile." : `First Name: ${user.firstName}`}</p>
            <p>{user === null ? "Please log in to view profile." : `Last Name: ${user.lastName}`}</p>
            <p>{user === null ? "Please log in to view profile." : `Pronouns: ${user.pronouns}`}</p>
            <p>{user === null ? "Please log in to view profile." : `Favorite Drink: ${user.favDrink}`}</p>
            <p>{user === null ? "Please log in to view profile." : `Favorite Cafe: ${user.favCafe}`}</p>
            <p>{user === null ? "Please log in to view profile." : `Bio: ${user.bio}`}</p>
            
        </div>
    
      );
    };
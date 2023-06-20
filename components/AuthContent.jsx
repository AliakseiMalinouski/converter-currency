'use client';

import React from "react";
import { useState, useEffect } from "react";
import { auth } from "@/firebase-config";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';

export const AuthContent = () => {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [user, setUser] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, current => {
            setUser(current?.email);
        })
    }, [])

    const handleChange = (eo) => setData({...data, [eo.target.name]: eo.target.value});


    const regestration = async (eo) => {

        eo.preventDefault();

        let {email, password} = data;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
        }
        catch {

        }
    }

    return (
        <div>
            <h3>{user}</h3>
            <form onSubmit={regestration}>
                <input type="text" placeholder="email" name="email" value={data.email} onChange={handleChange}/>
                <input type="text" placeholder="password" name="password" value={data.password} onChange={handleChange}/>
                <button type="submit">Auth</button>
            </form>
            <button type="button" onClick={() => signOut(auth)}>Sign Out</button>
        </div>
    )
}
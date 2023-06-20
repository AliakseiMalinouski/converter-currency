'use client';

import React from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase-config";
import { useState, useEffect } from "react";

export const LoginContent = () => {

    const [user, setUser] = useState("");

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        onAuthStateChanged(auth, current => {
            setUser(current?.email);
        })
    }, []);


    const handleChange = (eo) => setData({...data, [eo.target.name]: eo.target.value});

    const login = async (eo) => {

        eo.preventDefault();

        let {email, password} = data;

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch {

        }
    }
    
    return (
        <div>
            <h3>{user}</h3>
            <form onSubmit={login}>
                <input type="text" placeholder="email" name="email" value={data.email} onChange={handleChange}/>
                <input type="text" placeholder="password" name="password" value={data.password} onChange={handleChange}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
"use client"
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import auth from '../firebase/config';

const Homepage = () => {
    const [user, setUser] = useState<any | null>(null);
    useEffect(() => {
        auth.onAuthStateChanged((user: any) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
        });
    }, []);

    const logOut = async () => {
        await signOut(auth);
    };

    return (
        <>
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold">Homepage</h1>
            <div className="mt-4">
                <button
                onClick={logOut}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                Sign out
                </button>
            </div>
            </div>
        </div>
        </>
    );
}
export default Homepage;
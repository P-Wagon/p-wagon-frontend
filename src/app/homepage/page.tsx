"use client";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import auth from "../firebase/config";

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
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#000B18] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <div className="bg-black w-full text-center py-4 absolute top-0">
          <h1
            className="text-4xl font-bold text-white"
          >
            PWagon
          </h1>{" "}
        </div>
        <div className="flex flex-col">
          <button
            onClick={logOut}
            className="px-4 py-2 bg-transparent border border-[#00D094] text-white rounded-md absolute top-24 right-5 sm:right-10"
          >
            SIGN OUT
          </button>
        </div>
      </div>
    </>
  );
};

export default Homepage;

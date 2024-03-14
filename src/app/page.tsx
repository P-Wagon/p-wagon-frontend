"use client";
import { useState, useEffect } from "react";
import auth from './firebase/config';
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Homepage from "./homepage/page";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setIsLoading(false); // Hide loading screen after user check
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup function to avoid memory leaks
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loading-screen">
          <p>Loading...</p>
        </div>
      ) : (
        user ? (
          <Homepage />
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Welcome to Firebase Auth</h1>
            <div className="mt-4">
              <button
                onClick={signInWithGoogle}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Sign in with Google
              </button>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Home;

// Add CSS for loading screen (optional)
// .loading-screen {
//   position: fixed; /* Keep it on top of content */
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
//   display: flex; /* Center content vertically and horizontally */
//   justify-content: center;
//   align-items: center;
//   z-index: 999; /* Ensure it's on top of other elements */
// }

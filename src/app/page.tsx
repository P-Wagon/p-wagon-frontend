"use client"
import { useState, useEffect } from "react";
import auth from "./firebase/config";
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
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#000B18] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white">
        <p>Loading...</p>
        </div>
      ) : user ? (
        <Homepage />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#000B18] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
          <div className="bg-black w-full text-center py-4 absolute top-0">
            <h1
              className="text-4xl font-bold text-white pwagon-font"
              style={{ fontFamily: "ActionIs" }}
            >
              PWagon
            </h1>{" "}
          </div>
          <div className="">
            <button
              onClick={signInWithGoogle}
              className="px-4 py-2 bg-transparent border-2 border-[#00D094] text-white rounded-md"
            >
              SIGN IN
            </button>
          </div>
        </div>
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

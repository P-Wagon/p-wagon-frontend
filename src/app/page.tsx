"use client";
import { useState, useEffect } from "react";
import auth from "./firebase/config";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Homepage from "./homepage/page";
import { Button } from "@chakra-ui/react";

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

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center [background:radial-gradient(150%_150%_at_50%_10%,#000_40%,#253733_100%)]">
          <p>Loading...</p>
        </div>
      ) : user ? (
        <Homepage />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#000B18] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
          <div className="w-full text-center py-4 absolute top-0">
            <h1
              className="text-4xl font-bold text-white"
              style={{
                textShadow: "5px 5px 5px rgba(0, 0, 0, 1)",
                WebkitTextStroke: "1px black",
                WebkitTextFillColor: "white",
              }}
            >
              PWagon
            </h1>{" "}
          </div>
          <div className="mt-4">
            <Button
              onClick={signInWithGoogle}
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
              style={{
                border: "1px solid yellow",
                background: isHovered ? "yellow" : "transparent",
                color: isHovered ? "black" : "white",
              }}
            >
              SIGN IN
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

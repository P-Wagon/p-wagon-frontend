"use client";
import { useState, useEffect } from "react";
import auth from "./firebase/config";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Homepage from "./homepage/page";
import { Button } from "@chakra-ui/react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "../../components/BackgroundCircles";

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

  const [text, count] = useTypewriter({
    words: ["P-Wagon", "Your Eyewitness On The Road"],
    loop: true,
    delaySpeed: 1000,
  });

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center [background:radial-gradient(150%_150%_at_50%_10%,#000_40%,#253733_100%)]">
          <p>Loading...</p>
        </div>
      ) : user ? (
        <Homepage />
      ) : (
        <>
          <div className="h-screen flex flex-col -space-y-2 items-center justify-center text-center overflow-hidden z-500 bg-[#000B18] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
            <BackgroundCircles />

            <div className="z-20">
              <h1 className="text-4xl sm:text-5xl font-semibold px-18 text-white">
                <span>{text}</span>
                <Cursor cursorColor="red" />{" "}
              </h1>
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
        </>
      )}
    </>
  );
};

export default Home;

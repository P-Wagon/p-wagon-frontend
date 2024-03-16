"use client";
import { useState, useEffect } from "react";
import auth from "./firebase/config";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Homepage from "./homepage/page";
import { Button, Spinner } from "@chakra-ui/react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";

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
        <div className="h-screen flex flex-col -space-y-2 items-center justify-center text-center overflow-hidden z-500 bg-neutral-950 bg-[radial-gradient(circle_farthest-side,rgba(37,55,51.15),rgba(255,255,255,0))]">
          {" "}
          <Spinner size="xl" color="white"/>
        </div>
      ) : user ? (
        <Homepage />
      ) : (
        <>
          <div className="h-screen flex flex-col -space-y-2 items-center justify-center text-center overflow-hidden z-500 bg-neutral-950 bg-[radial-gradient(circle_farthest-side,rgba(37,55,51.15),rgba(255,255,255,0))]">
            <BackgroundCircles />
            <div className="absolute top-0 bg-[rgb(0,0,0,0)] w-full h-[10vh] flex flex-row items-center justify-around">
              <img
                className="flex object-contain h-[8vh] absolute left-0 ml-5 mt-5"
                src="https://cdn.discordapp.com/attachments/894801439992475768/1218489323402432562/pwagon_logo.png?ex=6607d99d&is=65f5649d&hm=cf6970ad70eb44c6c06e368c66637495aa53ea2501fe5d64a4b7d321c0ab32d8&"
              ></img>
              <div className="absolute right-0 mr-7 mt-5">
                <Button
                  onClick={signInWithGoogle}
                  onMouseEnter={handleHover}
                  onMouseLeave={handleHover}
                  style={{
                    border: "1px solid #00D094",
                    background: isHovered ? "#00D094" : "transparent",
                    color: isHovered ? "black" : "white",
                  }}
                >
                  SIGN IN
                </Button>
              </div>
            </div>
            <div className="z-20">
              <h1 className="text-4xl sm:text-5xl font-semibold px-18 text-white">
                <span>{text}</span>
                <Cursor cursorColor="red" />{" "}
              </h1>
              {/* <div className="mt-10">
                  <Button 
                    onClick={signInWithGoogle}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                    style={{
                      border: "1px solid #00D094",
                      background: isHovered ? "#00D094" : "transparent",
                      color: isHovered ? "black" : "white",
                    }}
                  >
                    SIGN IN
                  </Button>
                </div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;

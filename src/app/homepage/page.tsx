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
      <div className="flex flex-col h-screen items-center justify-center [background:radial-gradient(150%_150%_at_50%_10%,#253733_50%,#00D094_100%)]">
        <h1 className="text-4xl font-bold text-white mt-8 items-center">
          PWagon
        </h1>{" "}
        
        <div className="bg-white shadow-md rounded my-6 items-center justify-center">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-[#00D094] text-[#242830] uppercase text-sm leading-normal">
                <th className="p-4 text-center font-bold">S.NO</th>
                {/* <th className="py-3 px-6 text-left">Crime Description</th> */}
                <th className="p-4 text-center font-bold">License Plate Number</th>
                {/* <th className="py-3 px-6 text-center">Other Features</th> */}
              </tr>
            </thead>
            <tbody className="bg-black text-white text-sm font-light">
              <tr className="items-center justify-center">
                <td className="py-3 px-6 text-left whitespace-nowrap">1</td>
                {/* <td className="py-3 px-6 text-left whitespace-nowrap">John Doe</td> */}
                <td className="py-3 px-6 text-center">TN 01 AN 4545</td>
                {/* <td className="py-3 px-6 text-center">john@example.com</td> */}
              </tr>
              <tr className="items-center justify-center">
                <td className="py-3 px-6 text-left whitespace-nowrap">2</td>
                {/* <td className="py-3 px-6 text-left whitespace-nowrap">Jane Smith</td> */}
                <td className="py-3 px-6 text-center">KA 23 FK 2045</td>
                {/* <td className="py-3 px-6 text-center">jane@example.com</td> */}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col">
          <button
            onClick={logOut}
            className="px-4 py-2 bg-transparent border border-green-400 text-white rounded-md"
          >
            SIGN OUT
          </button>
        </div>

      </div>
    </>
  );
};

export default Homepage;

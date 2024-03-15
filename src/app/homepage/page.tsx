import React, { useState, useEffect, Fragment } from "react";
import { signOut } from "firebase/auth";
import auth from "../firebase/config";
import ModalFormInput from "../../../components/modalForm";
import CrimesTable from "../../../components/dataTable";
import { Icon } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

const Homepage: React.FC = () => {
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

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Fragment>
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#000B18] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
          <div className="w-full text-center py-4 absolute top-0">
            <h1
              className="text-4xl font-bold text-white pwagon-font"
              style={{
                fontFamily: "ActionIs",
                textShadow: "5px 5px 5px rgba(0, 0, 0, 1)",
                WebkitTextStroke: "1px black",
                WebkitTextFillColor: "white",
              }}
            >
              PWagon
            </h1>{" "}
          </div>
          <div className="text-gray-50 overflow-auto max-h-[70vh] mt-24">
            <CrimesTable />
          </div>
          <div className="flex flex-col">
            <button
              onClick={logOut}
              className="px-4 py-2 bg-transparent border-1 border-[#00D094] text-white rounded-md absolute top-20 right-5 sm:right-10"
            >
              <Icon as={FiLogOut} boxSize={6} color="red"/>
            </button>
            <div className="absolute top-24 left-5 sm:left-10">
              <ModalFormInput />
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default Homepage;

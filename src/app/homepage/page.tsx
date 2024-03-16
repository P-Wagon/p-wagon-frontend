"use client";
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
        <div className="h-screen flex flex-col -space-y-2 items-center justify-center text-center overflow-hidden z-500 bg-neutral-950 bg-[radial-gradient(circle_farthest-side,rgba(37,55,51.15),rgba(255,255,255,0))]">
          <div className="absolute top-0 bg-[rgb(0,0,0,0)] w-full h-[10vh] flex flex-row items-center justify-around">
            <img
              className="flex object-contain h-[8vh] absolute left-0 ml-5 mt-5"
              src="https://cdn.discordapp.com/attachments/894801439992475768/1218489323402432562/pwagon_logo.png?ex=6607d99d&is=65f5649d&hm=cf6970ad70eb44c6c06e368c66637495aa53ea2501fe5d64a4b7d321c0ab32d8&"
            ></img>
            <div className="absolute right-0 mr-7 mt-5">
              <button
                onClick={logOut}
                className="px-4 py-2 bg-transparent border-1 border-[#00D094] text-[#FF0000] text-lg rounded-md flex items-center"
              >
                <Icon
                  as={FiLogOut}
                  boxSize={8}
                  color="#FF0000"
                  className="mr-2"
                />
                LOG OUT
              </button>
            </div>
          </div>
          <div className="text-gray-50 overflow-auto max-h-[70vh] mt-24">
            <CrimesTable />
          </div>
          <div className="absolute top-28">
            <ModalFormInput />
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default Homepage;

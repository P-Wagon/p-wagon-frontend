import React from "react";
import { motion } from "framer-motion";

type Props = {};

export default function BackgroundCircles({}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        scale: [1, 2, 2, 3, 1],
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
        borderRadius: ["20%","20%","50%","80%","20%"],
      }}
      transition={{
        duration: 2.5,
      }}
      className="relative flex justify-center items-center"
    >
      <div className="border border-red-500 rounded-full h-[200px] w-[200px] absolute animate-ping mt-19" />
      <div className="border border-green-500 rounded-full h-[300px] w-[300px] absolute animate-ping mt-19" />
      <div className="border border-blue-500 rounded-full h-[500px] w-[500px] absolute animate-ping mt-19" />
      <div className="border border-yellow-500 opacity-20 rounded-full h-[650px] w-[650px] absolute animate-pulse mt-19" />
      <div className="border border-pink-500 rounded-full h-[800px] w-[800px] absolute animate-ping mt-19" />
    </motion.div>
  );
}
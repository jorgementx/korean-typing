"use client";

import { useRef, useState, useEffect } from "react";
import SuccessModal from "./SuccessModal";

function TypingGame({ text }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState(0);

  const textAreaRef = useRef();

  useEffect(() => {
    textAreaRef.current.focus();
    setLoaded(true);
  }, []);

  function handleChange(e) {
    setInput(e.target.value);
    setError(!text.startsWith(e.target.value));
    setSuccess(text === e.target.value);
  }

  return (
    <>
      <div className="container max-w-screen-lg flex flex-col mx-auto p-8 gap-7">
        <div className="w-full text-white/50 text-xl relative">
          {text}
          <div className="absolute text-xl left-0 top-0 ">
            <span
              className={
                "bg-slate-700 rounded " +
                (!error ? "text-emerald-400" : "text-red-500")
              }
            >
              {text.slice(0, input.length)}
              <div className="h-7 bg-slate-300 w-0.5  absolute -translate-x-0.5 animate-pulse inline-block"></div>
            </span>
          </div>
        </div>
        <textarea
          className={
            "focus w-full h-64 outline-none outline-2 border-none rounded-lg block p-2 " +
            (!input.length
              ? "bg-gray-200 outline-white"
              : error
              ? "outline-red-500 bg-red-100"
              : "outline-emerald-400 bg-emerald-100") +
            (loaded ? " transition-all duration-500" : "")
          }
          type="text"
          value={input}
          ref={textAreaRef}
          onChange={handleChange}
        />
      </div>
      {success && showModal && (
        <SuccessModal
          onDismiss={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}

export default TypingGame;

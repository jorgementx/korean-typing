"use client";
import { useState, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import jplayout from "simple-keyboard-layouts/build/layouts/japanese";
import krlayout from "simple-keyboard-layouts/build/layouts/korean";
import eslayout from "simple-keyboard-layouts/build/layouts/spanish";
import enlayout from "simple-keyboard-layouts/build/layouts/english";
import { getRandomInt } from "@/lib/utils";
import sakuraBranch from "@/assets/cherry-blossom-branch01.svg";
import "react-simple-keyboard/build/css/index.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./keyboardTest.css";

function KeyboardTest({wordList}) {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const [mode, setMode] = useState("rndLetters");
  const keyboard = useRef();
  // const [words, setWords] = useState(getWordsList("korean", 200));
  //get a random word from the list
  const [currentWord, setCurrentWord] = useState(wordList[getRandomInt(wordList.length)]);

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  const handleModeChange = (value) => {
    switch (value) {
      case "rndLetters":
        setMode("rndLetters");
      case "rndWords":
        setMode("rndWords");
        break;
      case "rndSet":
        setMode("rndSet");
        break;
      default:
        setMode("rndLetters");
        break;
    }
  };

  const handleLayoutChange = (value) => {
    switch (value) {
      case "English":
        setLayout("default");
        keyboard.current.setOptions({
          layout: enlayout.layout,
        });
        break;
      case "Spanish":
        setLayout("default");
        keyboard.current.setOptions({
          layout: eslayout.layout,
        });
        break;
      case "Dvorak":
        setLayout("default");
        keyboard.current.setOptions({
          layout: enlayout.layout,
        });
        break;
      case "Japanese":
        setLayout("default");
        keyboard.current.setOptions({
          layout: jplayout.layout,
        });
        break;
      case "Korean":
        setLayout("default");
        keyboard.current.setOptions({
          layout: {
            default: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ [ ] \\",
              "{lock} ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ ; ' {enter}",
              "{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ , . / {shift}",
              ".com @ {space}",
            ],
            shift: [
              "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
              "{tab} ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅕ ㅑ ㅒ ㅖ { } |",
              '{lock} ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ : " {enter}',
              "{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ < > ? {shift}",
              ".com @ {space}",
            ],
          },
        });
        break;
      default:
        setLayout("default");
        keyboard.current.setOptions({
          layout: enlayout.layout,
        });
    }
  };

  const handleSpacePress = (e) => {
    if (e.key === " ") {
      switch (mode) {
        case "rndLetters":
          setInput("");
          setCurrentWord(wordList[getRandomInt(wordList.length)]);
          break;
        case "rndWords":
          setInput("");
          setCurrentWord(wordList[getRandomInt(wordList.length)]);
          break;
        case "rndSet":
          setInput("");
          setCurrentWord(wordList[getRandomInt(wordList.length)]);
          break;
        default:
          setInput("");
          setCurrentWord(wordList[getRandomInt(wordList.length)]);
          break;
      }
    }
  }

  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-primary-content text-5xl mb-10 font-thin mx-auto w-fit">
          {currentWord}
        </h1>
        <input
          style={{
            backgroundImage: `url(${sakuraBranch.src})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            backgroundSize: "40%",
          }}
          className={
            "w-full h-7 p-8 text-lg border-none box-border rounded-md mb-2 outline-none focus:outline-rose-300 "
          }
          value={input}
          onKeyUp={handleSpacePress}
          placeholder={"Start typing..."}
          onChange={onChangeInput}
        />
        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          layoutName={layout}
          onKeyPress={onKeyPress}
          theme={"hg-theme-default hg-layout-default sakuraTheme"}
          // layout={eslayout.layout}
          physicalKeyboardHighlight={true}
          physicalKeyboardHighlightPress={true}
          syncInstanceInputs={true}
          buttonTheme={[
            {
              class: "accent-key",
              buttons: "{shift} {backspace} {tab} @ {bksp} .com {lock} {enter}",
            },
          ]}
        />
        <div className="flex gap-2">
          <Select className="" onValueChange={handleLayoutChange}>
            <SelectTrigger className="w-full mt-2 focus:ring-rose-300 focus:ring-offset-base-100">
              <SelectValue placeholder="Keyboard layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="Dvorak">Dvorak</SelectItem>
              <SelectItem value="Japanese">Japanese</SelectItem>
              <SelectItem value="Korean">Korean</SelectItem>
            </SelectContent>
          </Select>
          <Select className="" onValueChange={handleModeChange}>
            <SelectTrigger className="w-full mt-2 focus:ring-rose-300 focus:ring-offset-base-100">
              <SelectValue placeholder="Exercise mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rndLetters">Random letters</SelectItem>
              <SelectItem value="rndWords">Random words</SelectItem>
              <SelectItem value="rndSet">
                Random set of words (1 minute)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}

export default KeyboardTest;

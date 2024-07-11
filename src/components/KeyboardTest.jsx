"use client";
import { useState, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import jplayout from "simple-keyboard-layouts/build/layouts/japanese";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import "./keyboardTest.css";

const customKolayout = {
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
};

function KeyboardTest({ wordList }) {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const [mode, setMode] = useState("rndLetters");
  // const [theme, setTheme] = useState("default");
  const keyboard = useRef();
  // const [currentWord, setCurrentWord] = useState(wordList[getRandomInt(wordList.length)]);
  const lettersTopRow = "ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔ";
  const lettersHomeRow = "ㅁㄴㅇㄹㅎㅗㅓㅏㅣ";
  const lettersBottomRow = "ㅋㅌㅊㅍㅠㅜㅡ";
  const lettersFullWithoutShift =
    lettersTopRow + lettersHomeRow + lettersBottomRow;
  const lettersFull = lettersFullWithoutShift + "ㅃㅉㄸㄲㅆㅒㅖ";
  let letters = lettersFullWithoutShift;
  const [currentWord, setCurrentWord] = useState(
    letters[getRandomInt(letters.length)]
  );
  const [highlightNextLetter, setHighlightNextLetter] = useState(true);
  const [nextLetter, setNextLetter] = useState(currentWord[0]); // TODO: en el caso del coreano hay que separar en jamo (y por lo tanto no va a valer con mirar la longitud del input actual, habrá que contar las teclas pulsadas por ejemplo)
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
    // setNextLetter(currentWord[input.length]);
  };

  const handleHighlightToggle = (value) => {
    setHighlightNextLetter(value.target.checked);
  };

  const handleModeChange = (value) => {
    setMode(value);
    // switch (value) {
    //   case "rndLetters":
    //     setMode("rndLetters");
    //   case "rndWords":
    //     setMode("rndWords");
    //     break;
    //   case "rndSet":
    //     setMode("rndSet");
    //     break;
    //   default:
    //     setMode("rndLetters");
    //     break;
    // }
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
          layout: customKolayout,
        });
        break;
      default:
        setLayout("default");
        keyboard.current.setOptions({
          layout: customKolayout,
        });
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === " ") {
      switch (mode) {
        case "rndLetters":
          setInput("");
          const letter = letters[getRandomInt(letters.length)];
          setCurrentWord(letter);
          setNextLetter(letter);
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
    if (e.key === "Shift") {
      setLayout("default");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Shift") {
      setLayout("shift");
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-5xl mb-10 font-thin mx-auto w-fit">
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
            "w-full px-8 h-[4.5rem] text-4xl font-semibold border-none text-center rounded-md mb-2 outline-none focus:outline-rose-300 "
          }
          value={input}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          placeholder={"Start typing..."}
          onChange={onChangeInput}
        />
        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          layoutName={layout}
          onKeyPress={onKeyPress}
          theme={"hg-theme-default hg-layout-default sakuraTheme"}
          layout={customKolayout}
          physicalKeyboardHighlight={true}
          physicalKeyboardHighlightPress={true}
          syncInstanceInputs={true}
          buttonTheme={[
            {
              class: "accent-key",
              buttons: "{shift} {backspace} {tab} @ {bksp} .com {lock} {enter}",
            },
            {
              class: highlightNextLetter ? "highlight-key" : "",
              buttons: nextLetter,
            },
          ]}
        />
        <div className="flex gap-2 items-center">
          <Select
            className=""
            onValueChange={handleLayoutChange}
            defaultValue="Korean"
          >
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
          <Select
            className=""
            onValueChange={handleModeChange}
            defaultValue="rndLetters"
          >
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
          {mode === "rndLetters" && (
            <input
              type="checkbox"
              class="toggle toggle-lg tooltip"
              data-tip="Show/hide letter highlight"
              checked={highlightNextLetter}
              onChange={handleHighlightToggle}
            />
          )}
        </div>
        {/* {mode === "rndLetters" && (
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Home row</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Top row</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Bottom row</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Full Keyboard (without shift)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Full keyboard (with shift)</Label>
            </div>
          </RadioGroup>
        )} */}
      </div>
    </>
  );
}

export default KeyboardTest;

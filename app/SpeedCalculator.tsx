"use client";

import { Flex } from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";
import TypingArea from "./TypingArea";
import "./SpeedTypingGame.css";
import GameOver from "./GameOver";

const SpeedCalculator = () => {
  const paragraphs: string | any[] = [
    "A plant is one of the most important living things that develop on the earth and is " +
      "made up of stems, leaves, roots, and so on. Parts of Plants: The part of the plant " +
      "that developed beneath the soil is referred to as root and the part that grows " +
      "outside of the soil is known as shoot. The shoot consists of stems, branches, " +
      "leaves, fruits, and flowers. Plants are made up of six main parts: roots, stems, " +
      "leaves, flowers, fruits, and seeds.",
  ];

  const inputFieldRef = useRef<HTMLInputElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const errorAudioRef = useRef<HTMLAudioElement | null>(null);

  const [typingText, setTypingText] = useState<Array<React.ReactNode>>([]);
  const [inpFieldValue, setInpFieldValue] = useState("");
  const maxTime = 20;
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [charIndex, setCharIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    loadParagraph();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isTyping && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);

        let cpm = (charIndex - mistakes) * (60 / (maxTime - timeLeft));
        cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
        setCPM(parseInt(cpm.toFixed(0), 10));

        let wpm = Math.round(
          ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
        );
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        setWPM(wpm);
      }, 1000);
    } else if (timeLeft === 0) {
      if (interval) {
        clearInterval(interval);
      }
      setIsTyping(false);
      setGameOver(true);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTyping, timeLeft, charIndex, mistakes, maxTime]);

  const loadParagraph = () => {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);

    if (inputFieldRef.current) {
      inputFieldRef.current.focus();
    }

    const content = Array.from(paragraphs[ranIndex] as string[]).map(
      (letter, index) => (
        <span
          key={index}
          style={{ color: letter !== " " ? "#000" : "transparent" }}
          className={`char ${index === 0 ? "active" : ""}`}
        >
          {letter !== " " ? letter : "_"}
        </span>
      )
    );

    setTypingText(content);
    setInpFieldValue("");
    setCharIndex(0);
    setMistakes(0);
    setIsTyping(false);
  };

  const initTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const characters = document.querySelectorAll(
      ".char"
    ) as NodeListOf<HTMLElement>;
    let typedChar = event.target.value;

    if (charIndex < characters.length && timeLeft > 0) {
      let currentChar = characters[charIndex].innerText;
      if (currentChar === "_") currentChar = " ";
      if (!isTyping) {
        setIsTyping(true);
      }
      if (typedChar === currentChar) {
        setCharIndex(charIndex + 1);
        if (charIndex + 1 < characters.length)
          characters[charIndex + 1].classList.add("active");
        characters[charIndex].classList.remove("active");
        characters[charIndex].classList.add("correct");
        // Play the keyboard sound on correct key press
        if (audioRef.current) {
          audioRef.current.load();
          audioRef.current.play();
        }
      } else {
        setCharIndex(charIndex + 1);
        setMistakes(mistakes + 1);
        characters[charIndex].classList.remove("active");
        if (charIndex + 1 < characters.length)
          characters[charIndex + 1].classList.add("active");
        characters[charIndex].classList.add("wrong");
        // Play the error sound on incorrect key press
        if (errorAudioRef.current) {
          errorAudioRef.current.load();
          errorAudioRef.current.play();
        }
      }

      if (charIndex === characters.length - 1) {
        setIsTyping(false);
        setGameOver(true);
      }

      let wpm = Math.round(
        ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
      );
      wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
      setWPM(wpm);

      let cpm = (charIndex - mistakes) * (60 / (maxTime - timeLeft));
      cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
      setCPM(parseInt(cpm.toFixed(0), 10));
    } else {
      setIsTyping(false);
      setGameOver(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const characters = document.querySelectorAll(
      ".char"
    ) as NodeListOf<HTMLElement>;

    if (
      event.key === "Backspace" &&
      charIndex > 0 &&
      charIndex < characters.length &&
      timeLeft > 0
    ) {
      if (characters[charIndex - 1].classList.contains("correct")) {
        characters[charIndex - 1].classList.remove("correct");
      }
      if (characters[charIndex - 1].classList.contains("wrong")) {
        characters[charIndex - 1].classList.remove("wrong");
        setMistakes(mistakes - 1);
      }
      characters[charIndex].classList.remove("active");
      characters[charIndex - 1].classList.add("active");
      setCharIndex(charIndex - 1);

      let cpm = (charIndex - mistakes - 1) * (60 / (maxTime - timeLeft));
      cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
      setCPM(parseInt(cpm.toFixed(0), 10));

      let wpm = Math.round(
        ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
      );
      wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
      setWPM(wpm);
    }
  };

  const resetGame = () => {
    setIsTyping(false);
    setTimeLeft(maxTime);
    setCharIndex(0);
    setMistakes(0);
    setTypingText([]);
    setCPM(0);
    setWPM(0);

    const characters = document.querySelectorAll(
      ".char"
    ) as NodeListOf<HTMLElement>;
    characters.forEach((span) => {
      span.classList.remove("correct");
      span.classList.remove("wrong");
      span.classList.remove("active");
    });

    if (characters[0]) {
      characters[0].classList.add("active");
    }

    loadParagraph();
  };

  return (
    <Flex
      direction="column"
      justify="between"
      align="center"
      gap="4"
      width="100%"
      className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0"
    >
      <input
        ref={inputFieldRef}
        type="text"
        className="input-field"
        value={inpFieldValue}
        onInput={initTyping}
        onKeyDown={handleKeyDown}
      />

      {/* Gameover modal */}
      <GameOver
        mistake={mistakes}
        WPM={WPM}
        CPM={CPM}
        open={gameOver}
        setOpen={setGameOver}
        reset={resetGame}
      />

      {/* Render the TypingArea child component */}
      <TypingArea
        typingText={typingText}
        timeLeft={timeLeft}
        mistake={mistakes}
        WPM={WPM}
        CPM={CPM}
        reset={resetGame}
      />
      {/* Include the audio element */}
      <audio ref={audioRef} src="/sounds/keystroke.mp3" preload="auto"></audio>
      <audio
        ref={errorAudioRef}
        src="/sounds/buzzer.mp3"
        preload="auto"
      ></audio>
    </Flex>
  );
};

export default SpeedCalculator;

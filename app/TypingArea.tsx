import { ReloadIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React, { MouseEventHandler, ReactNode } from "react";

interface Props {
  timeLeft: number;
  mistake: number;
  WPM: number;
  CPM: number;
  typingText: ReactNode;
  reset: MouseEventHandler;
}

const TypingArea = ({
  timeLeft,
  mistake,
  WPM,
  CPM,
  typingText,
  reset,
}: Props) => {
  return (
    <Flex
      direction="column"
      justify="between"
      align="center"
      gap="4"
      width="100%"
      className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0 lg:pt-20"
    >
      <div className="p-6 border-gray-100 bg-white rounded-md">
        <p id="paragraph" className="text-5xl !text-justify font-bold">
          {typingText}
        </p>
      </div>
      <Button size="2" onClick={reset} className="ml-3">
        <ReloadIcon width="16" height="16" /> Reset
      </Button>
      <Flex align="center" justify="between" gap="4" width="100%" mb="4">
        <ul className="resultDetails hidden md:flex justify-between gap-2 items-center w-full">
          <li className="time">
            <p>Time Left:</p>
            <span>
              <b>{timeLeft}</b>s
            </span>
          </li>
          <li className="mistake">
            <p>Mistakes:</p>
            <span>{mistake}</span>
          </li>
          <li className="wpm">
            <p>WPM:</p>
            <span>{WPM}</span>
          </li>
          <li className="cpm">
            <p>CPM:</p>
            <span>{CPM}</span>
          </li>
        </ul>
      </Flex>
    </Flex>
  );
};

export default TypingArea;

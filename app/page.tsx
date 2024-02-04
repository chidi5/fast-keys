import { Metadata } from "next";
import SpeedTypingGame from "./SpeedCalculator";

export default function Home() {
  return (
    <>
      <SpeedTypingGame />
    </>
  );
}

export const metadata: Metadata = {
  title: "Fask keys - Typing Game",
  description: "A typing game to track speed, WPM and CPM",
};

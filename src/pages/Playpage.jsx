import Button from "../components/Button";
import LoginsignupModal from "../components/loginsignupModal";
import { useState } from "react";
import { Game } from "../components/Game/Game";

export const Playpage = () => {
  const [start, setStart] = useState(false);
  console.log(start);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        {start ? (
          <Game reload={() => setStart(false)} />
        ) : (
          <Button title="Start" onClick={() => setStart(true)} />
        )}
        <LoginsignupModal />
      </div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import * as Colyseus from "colyseus.js";
import Questionaire from "./Questionaire";
import Avatar from "./Avatar";
import OtherPlayersAvatar from "./OtherPlayersAvatar";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
export const Game = ({ reload }) => {
  const endpoint = "fvcjgs.colyseus.de";
  const client = new Colyseus.Client(endpoint);
  const [room, setRoom] = useState(null);
  const [showQuestionare, setShowQuestionare] = useState(false);
  const [numberOfPlayers, setnumberOfPlayers] = useState(0);
  const [vote, setVote] = useState("");
  const [oneTrues, setoneTrues] = useState(0);
  const [timer, setTimer] = useState(30);
  const [winner, setWinner] = useState("");
  const [game, setGame] = useState(true);
  const [didYouWin, setDidYouWin] = useState(false);
  useEffect(() => {
    client.joinOrCreate("chat").then((room) => {
      setRoom(room);
      console.log("joined");
      room.onStateChange(function (state) {
        console.log(" room state:", state);
        setnumberOfPlayers(state.numberOfPlayers);
        setoneTrues(state.oneTrues);

        if (state.gameTimer !== 0) {
          const timeNow = Math.floor(Date.now() / 1000);
          console.log(
            "timenow: ",
            timeNow,
            "server time: ",
            state.gameTimer,
            "minus: ",
            timeNow - state.gameTimer
          );

          console.log("setier: ", 30 - (timeNow - state.gameTimer));
          setTimer(30 - (timeNow - state.gameTimer));
        }
      });
      room.onMessage("startMatch", () => {
        setShowQuestionare(true);
        console.log("startmatch");
      });
      room.onMessage("remake", () => {
        console.log("remake");
        setShowQuestionare(false);
      });
      room.onMessage("one", () => {
        setWinner("one");
        setGame(false);
      });
      room.onMessage("draw", () => {
        setWinner("draw");
        setGame(false);
      });
      room.onMessage("two", () => {
        setWinner("two");
        setGame(false);
      });
      room.onLeave(() => {
        console.log("reload");
        reload();
      });
    });
    return () => null;
  }, []);
  console.log(
    timer,
    vote,
    winner,
    (winner !== "" && winner === "one" && vote === "true") ||
      (vote === "false" && winner === "two")
  );
  if (
    (winner !== "" && winner === "one" && vote === "true") ||
    (vote === "false" && winner === "two")
  ) {
    return (
      <>
        <input type="checkbox" id="my-modal2" className={`modal-toggle `} />
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Congratulations you won!</h3>
            <p className="py-4">You've just won double your bet!</p>
            <div className="modal-action">
              <label
                htmlFor="my-modal2"
                className="btn"
                onClick={() => window.location.reload()}
              >
                Yay!
              </label>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (vote.length > 0 && game) {
    return (
      <>
        <div className="flex flex-col h-full w-full">
          <div className="heading flex flex-row justify-between">
            <div className="stat">
              <div className="stat-title">Total players</div>
              <div className="stat-value">{numberOfPlayers}</div>
            </div>
            <div className="stat flex flex-row-reverse">
              <CountdownCircleTimer
                isPlaying
                size={100}
                duration={30}
                initialRemainingTime={timer}
                colors={["#00FF00", "#c8ff00", "#ffd000", "#ff7300"]}
                colorsTime={[20, 15, 7, 0]}
                strokeWidth={8}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </div>
          </div>
          <div className="grid grid-flow-col justify-center h-full  card   place-items-center">
            {vote === "true" && <Avatar />}
            {numberOfPlayers > 1 && (
              <OtherPlayersAvatar
                number={vote === "true" ? oneTrues - 1 : oneTrues}
              />
            )}
          </div>
          <div className="divider"></div>
          <div className="grid grid-flow-col justify-center h-full card  place-items-center">
            {vote === "false" && <Avatar />}
            {numberOfPlayers > 1 && (
              <OtherPlayersAvatar
                number={
                  vote === "false"
                    ? numberOfPlayers - 1 - oneTrues
                    : numberOfPlayers - oneTrues
                }
              />
            )}
          </div>
        </div>
      </>
    );
  }

  if (!game && !didYouWin) {
    window.location.reload();
  }

  return (
    <>
      {showQuestionare && room && game && (
        <Questionaire
          room={room}
          setVote={setVote}
          show={showQuestionare}
          setShow={setShowQuestionare}
        />
      )}
    </>
  );
};
